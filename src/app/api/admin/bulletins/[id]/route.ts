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

    if (!data.title || !data.summary || !data.category) {
      return NextResponse.json(
        { error: 'Title, Category, and Summary are required' },
        { status: 400 }
      );
    }

    const updated = await prisma.engineeringBulletin.update({
      where: { id },
      data: {
        issue: data.issue?.trim(),
        title: data.title.trim(),
        category: data.category.trim(),
        date: data.date?.trim(),
        readTime: data.readTime?.trim(),
        summary: data.summary.trim(),
        highlights: Array.isArray(data.highlights) ? data.highlights : [],
        pdfUrl: data.pdfUrl?.trim() || '',
        isActive: data.isActive !== false,
        orderIndex: typeof data.orderIndex === 'number' ? data.orderIndex : 0,
      },
    });

    return NextResponse.json({ success: true, bulletin: updated });
  } catch (error: any) {
    console.error('Admin Bulletins PUT Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update bulletin' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;
    const { isActive } = await req.json();

    const updated = await prisma.engineeringBulletin.update({
      where: { id },
      data: { isActive: Boolean(isActive) },
    });

    return NextResponse.json({ success: true, bulletin: updated });
  } catch (error: any) {
    console.error('Admin Bulletins PATCH Error:', error);
    return NextResponse.json(
      { error: 'Failed to update bulletin status' },
      { status: 500 }
    );
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
    await prisma.engineeringBulletin.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Bulletin deleted successfully' });
  } catch (error: any) {
    console.error('Admin Bulletins DELETE Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete bulletin' },
      { status: 500 }
    );
  }
}
