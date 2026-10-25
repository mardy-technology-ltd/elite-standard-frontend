import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;
    const data = await req.json();

    const updated = await prisma.product.update({
      where: { id },
      data: {
        title: data.title,
        code: data.code,
        category: data.category,
        sector: data.sector,
        price: Number(data.price),
        priceFormatted: data.priceFormatted || `Tk ${Number(data.price || 0).toLocaleString()}`,
        inStock: data.inStock,
        stockBadge: data.stockBadge,
        image: data.image,
        variantsText: data.variantsText,
        specs: data.specs,
        href: data.href,
      },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
