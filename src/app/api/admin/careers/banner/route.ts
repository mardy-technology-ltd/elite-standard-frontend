import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rows = await prisma.$queryRaw<Array<{ value: string }>>`
      SELECT value FROM "SiteSetting" WHERE key = 'career_banner' LIMIT 1
    `;
    const banner = rows.length > 0 ? rows[0].value : null;
    return NextResponse.json({ success: true, banner });
  } catch (error: any) {
    console.error('Error fetching career banner:', error);
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
    const { banner } = body; // can be an image URL or null/empty to remove

    if (banner) {
      await prisma.$executeRaw`
        INSERT INTO "SiteSetting" (id, key, value, "createdAt", "updatedAt")
        VALUES (gen_random_uuid(), 'career_banner', ${banner}, NOW(), NOW())
        ON CONFLICT (key) DO UPDATE
        SET value = ${banner}, "updatedAt" = NOW()
      `;
    } else {
      await prisma.$executeRaw`
        DELETE FROM "SiteSetting" WHERE key = 'career_banner'
      `;
    }

    return NextResponse.json({ success: true, banner: banner || null });
  } catch (error: any) {
    console.error('Error saving career banner:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

