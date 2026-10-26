import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { isActive } = body;

    const updated = await prisma.newsletterSubscriber.update({
      where: { id },
      data: {
        ...(typeof isActive === "boolean" ? { isActive } : {}),
      },
    });

    return NextResponse.json({
      success: true,
      subscriber: updated,
    });
  } catch (error: any) {
    console.error("Admin Newsletter PATCH Error:", error);
    return NextResponse.json(
      { error: "Failed to update subscriber status" },
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
    await prisma.newsletterSubscriber.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Subscriber removed permanently",
    });
  } catch (error: any) {
    console.error("Admin Newsletter DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete subscriber" },
      { status: 500 }
    );
  }
}
