import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const department = searchParams.get('department');
    const search = searchParams.get('search');
    const status = searchParams.get('status'); // all, active, inactive

    const where: any = {};
    if (department && department !== 'all') {
      where.department = { contains: department, mode: 'insensitive' };
    }
    if (status === 'active') {
      where.isActive = true;
    } else if (status === 'inactive') {
      where.isActive = false;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { department: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } },
      ];
    }

    const positions = await prisma.jobPosition.findMany({
      where,
      include: {
        _count: {
          select: { applications: true },
        },
      },
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({ success: true, positions });
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

    if (!data.title || !data.department || !data.experience || !data.salary) {
      return NextResponse.json(
        { error: 'Job Title, Department, Experience, and Salary are required' },
        { status: 400 }
      );
    }

    const id = data.id || `job-${Date.now()}`;
    const slug = (data.slug || data.title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const count = await prisma.jobPosition.count();

    const position = await prisma.jobPosition.create({
      data: {
        id,
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        title: data.title.trim(),
        department: data.department.trim(),
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
        orderIndex: typeof data.orderIndex === 'number' ? data.orderIndex : count + 1,
      },
    });

    return NextResponse.json({ success: true, position });
  } catch (error: any) {
    console.error('Create job error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
