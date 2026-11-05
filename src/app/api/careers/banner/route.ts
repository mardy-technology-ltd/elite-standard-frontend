import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function parseBanners(rawValue: string | null): string[] {
  if (!rawValue) return [];
  try {
    const parsed = JSON.parse(rawValue);
    if (Array.isArray(parsed)) {
      return parsed.filter((b): b is string => typeof b === 'string' && b.trim().length > 0);
    }
  } catch {
    if (typeof rawValue === 'string' && rawValue.trim().length > 0) {
      return [rawValue.trim()];
    }
  }
  return [];
}

export async function GET() {
  try {
    const rows = await prisma.$queryRaw<Array<{ key: string; value: string }>>`
      SELECT key, value FROM "SiteSetting" 
      WHERE key IN ('career_banners', 'career_banner', 'career_banners_active')
    `;

    const activeRow = rows.find(r => r.key === 'career_banners_active');
    const isActive = activeRow ? activeRow.value !== 'false' : true;

    if (!isActive) {
      return NextResponse.json({ success: true, banners: [], isActive: false });
    }

    const bannerRow = rows.find(r => r.key === 'career_banners') || rows.find(r => r.key === 'career_banner');
    const banners = bannerRow ? parseBanners(bannerRow.value) : [];

    return NextResponse.json({ success: true, banners, isActive: true });
  } catch (error: any) {
    console.error('Public career banners fetch error:', error);
    return NextResponse.json({ success: true, banners: [], isActive: false });
  }
}
