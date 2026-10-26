import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search") || "";

    const where: any = {};
    if (category && category !== "ALL") {
      where.category = category;
    }
    if (search.trim()) {
      where.OR = [
        { name: { contains: search.trim(), mode: "insensitive" } },
        { type: { contains: search.trim(), mode: "insensitive" } },
        { monogram: { contains: search.trim(), mode: "insensitive" } },
      ];
    }

    const items = await prisma.clientReference.findMany({
      where,
      orderBy: [{ category: "asc" }, { orderIndex: "asc" }, { createdAt: "desc" }],
    });

    const totalCount = await prisma.clientReference.count();
    const clientsCount = await prisma.clientReference.count({ where: { category: "client" } });
    const partnersCount = await prisma.clientReference.count({ where: { category: "partner" } });

    return NextResponse.json({
      success: true,
      items,
      stats: {
        total: totalCount,
        clients: clientsCount,
        partners: partnersCount,
      },
    });
  } catch (error: any) {
    console.error("Admin Clients GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, type, category = "client", monogram, logo, bgColor, orderIndex, isActive = true } = body;

    if (!name || !type) {
      return NextResponse.json(
        { error: "Name and sector/type are required" },
        { status: 400 }
      );
    }

    const newItem = await prisma.clientReference.create({
      data: {
        name: name.trim(),
        type: type.trim(),
        category: category || "client",
        monogram: monogram ? monogram.trim().toUpperCase() : name.slice(0, 3).toUpperCase(),
        logo: logo || null,
        bgColor: bgColor || "bg-blue-50 text-blue-600 border-blue-100",
        orderIndex: typeof orderIndex === "number" ? orderIndex : 0,
        isActive: Boolean(isActive),
      },
    });

    return NextResponse.json({
      success: true,
      item: newItem,
    });
  } catch (error: any) {
    console.error("Admin Clients POST Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create client or partner" },
      { status: 500 }
    );
  }
}
