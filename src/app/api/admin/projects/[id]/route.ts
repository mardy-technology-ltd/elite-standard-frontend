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

    const updated = await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        category: data.category,
        client: data.client,
        location: data.location,
        completionDate: data.completionDate,
        description: data.description,
        image: data.image,
        scope: data.scope,
        ...(data.isFeatured !== undefined ? { isFeatured: Boolean(data.isFeatured) } : {}),
      },
    });

    return NextResponse.json({ success: true, project: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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
    const body = await req.json();

    if (body.isFeatured !== undefined) {
      const isFeatured = Boolean(body.isFeatured);

      // If setting this project as featured landmark, optionally clear other featured flags so only one primary landmark is active
      if (isFeatured) {
        await prisma.project.updateMany({
          where: { isFeatured: true, id: { not: id } },
          data: { isFeatured: false },
        });
      }

      const updated = await prisma.project.update({
        where: { id },
        data: { isFeatured },
      });

      return NextResponse.json({ success: true, project: updated });
    }

    return NextResponse.json({ error: 'Invalid update payload' }, { status: 400 });
  } catch (error: any) {
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
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Project deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
