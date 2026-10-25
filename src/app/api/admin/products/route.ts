import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where: any = {};
    if (category && category !== 'all') {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, products });
  } catch (error: any) {
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

    if (!data.title || !data.code || !data.category) {
      return NextResponse.json(
        { error: 'Title, Product Code, and Category are required' },
        { status: 400 }
      );
    }

    const id = data.id || `p-${Date.now()}`;
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const product = await prisma.product.create({
      data: {
        id,
        slug,
        code: data.code.trim().toUpperCase(),
        title: data.title,
        category: data.category,
        brand: data.brand || 'Elite Standard Limited',
        sector: Array.isArray(data.sector) ? data.sector : [data.sector || 'Industrial'],
        price: Number(data.price) || 0,
        priceFormatted: data.priceFormatted || `Tk ${Number(data.price || 0).toLocaleString()}`,
        regularPrice: data.regularPrice || null,
        inStock: data.inStock !== false,
        stockBadge: data.stockBadge || 'In Stock',
        warranty: data.warranty || '2 Years OEM Service Warranty',
        image: data.image || (data.galleryImages?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop'),
        galleryImages: Array.isArray(data.galleryImages) && data.galleryImages.length > 0 ? data.galleryImages : [data.image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop'],
        variantsText: data.variantsText || 'Standard Configuration',
        description: data.description || '',
        specs: Array.isArray(data.specs) ? data.specs : [],
        fullSpecs: Array.isArray(data.fullSpecs) ? data.fullSpecs : [],
        href: data.href || `/products/${slug}`,
        iconName: data.iconName || 'FaBoxes',
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
