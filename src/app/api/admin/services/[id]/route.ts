import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;
    const data = await req.json();

    if (!data.title || !data.code || !data.category) {
      return NextResponse.json(
        { error: 'Title, Service Code, and Category are required' },
        { status: 400 }
      );
    }

    const updated = await prisma.service.update({
      where: { id },
      data: {
        title: data.title.trim(),
        code: data.code.trim().toUpperCase(),
        category: data.category.toLowerCase(),
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
        orderIndex: typeof data.orderIndex === 'number' ? data.orderIndex : 0,
      },
    });

    return NextResponse.json({ success: true, service: updated });
  } catch (error: any) {
    console.error('Update service error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;
    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Service deleted' });
  } catch (error: any) {
    console.error('Delete service error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
