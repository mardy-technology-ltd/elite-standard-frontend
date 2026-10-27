import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await req.json();
    const { title, description, icon, image, href, orderIndex, isActive } = body;

    const data: any = {};
    if (title !== undefined) data.title = title.trim();
    if (description !== undefined) data.description = description.trim();
    if (icon !== undefined) data.icon = icon.trim();
    if (image !== undefined) data.image = image.trim();
    if (href !== undefined) data.href = href.trim();
    if (orderIndex !== undefined) data.orderIndex = Number(orderIndex);
    if (isActive !== undefined) data.isActive = Boolean(isActive);

    const updated = await prisma.industrySector.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, item: updated });
  } catch (error: any) {
    console.error("Admin Sector PUT Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update sector" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;
    await prisma.industrySector.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Sector deleted successfully" });
  } catch (error: any) {
    console.error("Admin Sector DELETE Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete sector" },
      { status: 500 }
    );
  }
}
