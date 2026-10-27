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

    if (!data.title || !data.experience || !data.salary) {
      return NextResponse.json(
        { error: 'Job Title, Experience, and Salary are required' },
        { status: 400 }
      );
    }

    const updated = await prisma.jobPosition.update({
      where: { id },
      data: {
        title: data.title.trim(),
        department: (data.department && data.department.trim()) ? data.department.trim() : 'General',
        location: data.location || 'Amtola / Banani, Dhaka',
        type: data.type || 'Full Time',
        experience: data.experience.trim(),
        salary: data.salary.trim(),
        salaryBadge: data.salaryBadge || data.salary.trim(),
        summary: data.summary || '',
        qualifications: Array.isArray(data.qualifications) ? data.qualifications : [],
        responsibilities: Array.isArray(data.responsibilities) ? data.responsibilities : [],
        isActive: data.isActive !== false,
        deadline: data.deadline || null,
        orderIndex: typeof data.orderIndex === 'number' ? data.orderIndex : 0,
      },
    });

    return NextResponse.json({ success: true, position: updated });
  } catch (error: any) {
    console.error('Update job error:', error);
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

    const updated = await prisma.jobPosition.update({
      where: { id },
      data: {
        ...(typeof body.isActive === 'boolean' && { isActive: body.isActive }),
        ...(typeof body.orderIndex === 'number' && { orderIndex: body.orderIndex }),
      },
    });

    return NextResponse.json({ success: true, position: updated });
  } catch (error: any) {
    console.error('Patch job error:', error);
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
    await prisma.jobPosition.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Position deleted successfully' });
  } catch (error: any) {
    console.error('Delete job error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
