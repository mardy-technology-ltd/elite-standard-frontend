import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { servicesData } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where: any = {};
    if (category && category !== 'all') {
      where.category = category.toLowerCase();
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

    if (services.length > 0) {
      return NextResponse.json({ success: true, services });
    }

    // Fallback to mockData if table empty
    let fallback = servicesData;
    if (category && category !== 'all') {
      fallback = fallback.filter((s) => s.category === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      fallback = fallback.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q) ||
          s.shortDescription.toLowerCase().includes(q)
      );
    }
    return NextResponse.json({ success: true, services: fallback });
  } catch (error: any) {
    console.error('Public services fetch error:', error);
    // Fallback on error
    return NextResponse.json({ success: true, services: servicesData });
  }
}
