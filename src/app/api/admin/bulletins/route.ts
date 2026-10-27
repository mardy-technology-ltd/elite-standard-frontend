import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: any = {};

    if (category && category !== 'all') {
      where.category = { contains: category, mode: 'insensitive' };
    }

    if (status === 'active') {
      where.isActive = true;
    } else if (status === 'inactive') {
      where.isActive = false;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } },
        { issue: { contains: search, mode: 'insensitive' } },
      ];
    }

    const bulletins = await prisma.engineeringBulletin.findMany({
      where,
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
    });

    const totalCount = await prisma.engineeringBulletin.count();
    const activeCount = await prisma.engineeringBulletin.count({ where: { isActive: true } });

    return NextResponse.json({
      success: true,
      bulletins,
      stats: {
        total: totalCount,
        active: activeCount,
        inactive: totalCount - activeCount,
      },
    });
  } catch (error: any) {
    console.error('Admin Bulletins GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin engineering bulletins' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();

    if (!data.title || !data.summary || !data.category) {
      return NextResponse.json(
        { error: 'Title, Category, and Summary are required' },
        { status: 400 }
      );
    }

    const count = await prisma.engineeringBulletin.count();
    const issue = data.issue?.trim() || `Bulletin #${count + 25} — Q4 Edition`;

    const bulletin = await prisma.engineeringBulletin.create({
      data: {
        issue,
        title: data.title.trim(),
        category: data.category.trim(),
        date: data.date?.trim() || new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
        readTime: data.readTime?.trim() || '5 min read',
        summary: data.summary.trim(),
        highlights: Array.isArray(data.highlights) ? data.highlights : [],
        pdfUrl: data.pdfUrl?.trim() || '',
        isActive: data.isActive !== false,
        orderIndex: typeof data.orderIndex === 'number' ? data.orderIndex : count + 1,
      },
    });

    return NextResponse.json({ success: true, bulletin });
  } catch (error: any) {
    console.error('Admin Bulletins POST Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create engineering bulletin' },
      { status: 500 }
    );
  }
}
