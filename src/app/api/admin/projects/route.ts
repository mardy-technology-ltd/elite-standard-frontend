import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';

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
        { client: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ];
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, projects });
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

    if (!data.title || !data.client || !data.category) {
      return NextResponse.json(
        { error: 'Project Title, Client, and Category are required' },
        { status: 400 }
      );
    }

    const id = data.id || `proj-${Date.now()}`;
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const project = await prisma.project.create({
      data: {
        id,
        slug,
        title: data.title,
        category: data.category,
        client: data.client,
        location: data.location || 'Dhaka, Bangladesh',
        completionDate: data.completionDate || '2024 - 2025',
        description: data.description || '',
        image: data.image || 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?q=80&w=800&auto=format&fit=crop',
        gallery: Array.isArray(data.gallery) ? data.gallery : [],
        scope: Array.isArray(data.scope) ? data.scope : [],
        isFeatured: Boolean(data.isFeatured),
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
