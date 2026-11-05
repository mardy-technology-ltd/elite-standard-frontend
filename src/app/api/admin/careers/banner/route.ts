import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';

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

    const bannerRow = rows.find(r => r.key === 'career_banners') || rows.find(r => r.key === 'career_banner');
    const activeRow = rows.find(r => r.key === 'career_banners_active');

    const banners = bannerRow ? parseBanners(bannerRow.value) : [];
    // Default isActive to true if not explicitly set to 'false'
    const isActive = activeRow ? activeRow.value !== 'false' : true;

    return NextResponse.json({ success: true, banners, isActive });
  } catch (error: any) {
    console.error('Error fetching career banners:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    // 1. If payload contains isActive toggle
    if (typeof body.isActive === 'boolean') {
      const activeStr = body.isActive ? 'true' : 'false';
      await prisma.$executeRaw`
        INSERT INTO "SiteSetting" (id, key, value, "createdAt", "updatedAt")
        VALUES (gen_random_uuid(), 'career_banners_active', ${activeStr}, NOW(), NOW())
        ON CONFLICT (key) DO UPDATE
        SET value = ${activeStr}, "updatedAt" = NOW()
      `;

      // If only updating isActive without sending banners array
      if (!Array.isArray(body.banners) && typeof body.banner !== 'string') {
        return NextResponse.json({ success: true, isActive: body.isActive });
      }
    }

    // 2. If payload contains banners list
    let bannersList: string[] = [];
    if (Array.isArray(body.banners)) {
      bannersList = body.banners.filter((b: any) => typeof b === 'string' && b.trim().length > 0);
    } else if (typeof body.banner === 'string' && body.banner.trim().length > 0) {
      bannersList = [body.banner.trim()];
    }

    const jsonValue = JSON.stringify(bannersList);

    if (bannersList.length > 0) {
      await prisma.$executeRaw`
        INSERT INTO "SiteSetting" (id, key, value, "createdAt", "updatedAt")
        VALUES (gen_random_uuid(), 'career_banners', ${jsonValue}, NOW(), NOW())
        ON CONFLICT (key) DO UPDATE
        SET value = ${jsonValue}, "updatedAt" = NOW()
      `;
    } else if (Array.isArray(body.banners)) {
      await prisma.$executeRaw`
        DELETE FROM "SiteSetting" WHERE key = 'career_banners' OR key = 'career_banner'
      `;
    }

    return NextResponse.json({ 
      success: true, 
      banners: bannersList,
      isActive: typeof body.isActive === 'boolean' ? body.isActive : true
    });
  } catch (error: any) {
    console.error('Error saving career banners:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
