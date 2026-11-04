import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rows = await prisma.$queryRaw<Array<{ value: string }>>`
      SELECT value FROM "SiteSetting" WHERE key = 'career_banner' LIMIT 1
    `;
    const banner = rows.length > 0 ? rows[0].value : null;
    return NextResponse.json({ success: true, banner });
  } catch (error: any) {
    console.error('Public career banner fetch error:', error);
    return NextResponse.json({ success: true, banner: null });
  }
}

