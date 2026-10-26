import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const department = searchParams.get('department');
    const search = searchParams.get('search');

    const where: any = { isActive: true };
    if (department && department !== 'all') {
      where.department = { contains: department, mode: 'insensitive' };
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
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({ success: true, positions });
  } catch (error: any) {
    console.error('Public careers fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
