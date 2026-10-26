import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category"); // "client", "partner", or null for all

    const where: any = { isActive: true };
    if (category) {
      where.category = category;
    }

    const clients = await prisma.clientReference.findMany({
      where,
      orderBy: { orderIndex: "asc" },
    });

    return NextResponse.json({
      success: true,
      clients,
    });
  } catch (error: any) {
    console.error("Public Clients GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients and partners" },
      { status: 500 }
    );
  }
}
