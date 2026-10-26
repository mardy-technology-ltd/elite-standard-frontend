import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { name, type, category, monogram, logo, bgColor, orderIndex, isActive } = body;

    const updated = await prisma.clientReference.update({
      where: { id },
      data: {
        ...(name ? { name: name.trim() } : {}),
        ...(type ? { type: type.trim() } : {}),
        ...(category ? { category } : {}),
        ...(monogram !== undefined ? { monogram: monogram ? monogram.trim().toUpperCase() : null } : {}),
        ...(logo !== undefined ? { logo } : {}),
        ...(bgColor !== undefined ? { bgColor } : {}),
        ...(typeof orderIndex === "number" ? { orderIndex } : {}),
        ...(typeof isActive === "boolean" ? { isActive } : {}),
      },
    });

    return NextResponse.json({
      success: true,
      item: updated,
    });
  } catch (error: any) {
    console.error("Admin Client PUT Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update client" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await prisma.clientReference.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Client reference removed successfully",
    });
  } catch (error: any) {
    console.error("Admin Client DELETE Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete client" },
      { status: 500 }
    );
  }
}
