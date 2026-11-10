import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');

    if (key) {
      const setting = await prisma.siteSetting.findUnique({
        where: { key },
      });
      return NextResponse.json({
        success: true,
        key,
        value: setting ? JSON.parse(setting.value) : null,
      });
    }

    // Return all category slider settings (keys starting with "category_slider_")
    const allSettings = await prisma.siteSetting.findMany({
      where: {
        key: { startsWith: 'category_slider_' },
      },
    });

    const slidersMap: Record<string, any> = {};
    allSettings.forEach((s) => {
      const catKey = s.key.replace('category_slider_', '');
      try {
        slidersMap[catKey] = JSON.parse(s.value);
      } catch {
        slidersMap[catKey] = s.value;
      }
    });

    return NextResponse.json({ success: true, sliders: slidersMap });
  } catch (error: any) {
    console.error('Error fetching category sliders:', error);
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
    const { categoryKey, slides } = data;

    if (!categoryKey) {
      return NextResponse.json(
        { error: 'categoryKey is required (e.g. eels, hvac, wts)' },
        { status: 400 }
      );
    }

    const key = `category_slider_${categoryKey.toLowerCase().trim()}`;
    const valueStr = JSON.stringify(Array.isArray(slides) ? slides : []);

    const updated = await prisma.siteSetting.upsert({
      where: { key },
      update: { value: valueStr },
      create: { key, value: valueStr },
    });

    return NextResponse.json({
      success: true,
      categoryKey,
      slides: JSON.parse(updated.value),
    });
  } catch (error: any) {
    console.error('Error saving category slider:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

