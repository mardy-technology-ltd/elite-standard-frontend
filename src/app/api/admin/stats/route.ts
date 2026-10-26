import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [
      servicesCount,
      productsCount,
      projectsCount,
      inquiriesCount,
      pendingInquiriesCount,
      careersCount,
      applicationsCount,
      blogsCount,
      recentInquiries,
    ] = await Promise.all([
      prisma.service.count(),
      prisma.product.count(),
      prisma.project.count(),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: 'PENDING' } }),
      prisma.jobPosition.count({ where: { isActive: true } }),
      prisma.jobApplication.count({ where: { status: 'NEW' } }),
      prisma.blog.count(),
      prisma.inquiry.findMany({
        orderBy: { createdAt: 'desc' },
        take: 6,
      }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        servicesCount,
        productsCount,
        projectsCount,
        inquiriesCount,
        pendingInquiriesCount,
        careersCount,
        applicationsCount,
        blogsCount,
      },
      recentInquiries,
    });
  } catch (error: any) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
