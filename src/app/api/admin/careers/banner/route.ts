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
    // Legacy single string support
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
    // Accept either banners array or single banner string
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
    } else {
      await prisma.$executeRaw`
        DELETE FROM "SiteSetting" WHERE key = 'career_banners' OR key = 'career_banner'
      `;
    }

    return NextResponse.json({ success: true, banners: bannersList });
  } catch (error: any) {
    console.error('Error saving career banners:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
