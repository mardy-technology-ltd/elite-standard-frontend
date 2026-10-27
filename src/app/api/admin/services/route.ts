import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where: any = {};
    if (category && category !== 'all') {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } },
      ];
    }

    const services = await prisma.service.findMany({
      where,
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({ success: true, services });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();

    if (!data.title || !data.code || !data.category) {
      return NextResponse.json(
        { error: 'Title, Service Code, and Category are required' },
        { status: 400 }
      );
    }

    const id = data.id || `s-${Date.now()}`;
    const slug = (data.slug || data.title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Check if slug or code already exists
    const existing = await prisma.service.findFirst({
      where: {
        OR: [{ slug }, { code: data.code.trim().toUpperCase() }],
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'A service with this Code or Slug already exists.' },
        { status: 400 }
      );
    }

    const count = await prisma.service.count();

    const service = await prisma.service.create({
      data: {
        id,
        slug,
        code: data.code.trim().toUpperCase(),
        category: data.category.toLowerCase(),
        title: data.title.trim(),
        subtitle: data.subtitle || '',
        shortDescription: data.shortDescription || '',
        fullDescription: data.fullDescription || '',
        icon: data.icon || 'FaIndustry',
        bannerImage:
          data.bannerImage ||
          'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
        compliance: Array.isArray(data.compliance) ? data.compliance : [],
        problems: Array.isArray(data.problems) ? data.problems : [],
        solutions: Array.isArray(data.solutions) ? data.solutions : [],
        scopeOfWork: Array.isArray(data.scopeOfWork) ? data.scopeOfWork : [],
        subServices: Array.isArray(data.subServices) ? data.subServices : [],
        faqs: Array.isArray(data.faqs) ? data.faqs : [],
        sectors: data.sectors || null,
        orderIndex: typeof data.orderIndex === 'number' ? data.orderIndex : count,
      },
    });

    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    console.error('Create service error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
