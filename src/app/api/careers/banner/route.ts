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
    const rows = await prisma.$queryRaw<Array<{ value: string }>>`
      SELECT value FROM "SiteSetting" WHERE key = 'career_banners' OR key = 'career_banner'
      ORDER BY CASE WHEN key = 'career_banners' THEN 1 ELSE 2 END
      LIMIT 1
    `;
    const banners = rows.length > 0 ? parseBanners(rows[0].value) : [];
    return NextResponse.json({ success: true, banners });
  } catch (error: any) {
    console.error('Public career banners fetch error:', error);
    return NextResponse.json({ success: true, banners: [] });
  }
}
