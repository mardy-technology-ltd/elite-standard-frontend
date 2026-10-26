import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const interest = searchParams.get("interest") || "ALL";
    const status = searchParams.get("status") || "ALL";

    const where: any = {};

    if (search.trim()) {
      where.OR = [
        { email: { contains: search.trim(), mode: "insensitive" } },
        { name: { contains: search.trim(), mode: "insensitive" } },
      ];
    }

    if (interest !== "ALL") {
      where.interest = interest;
    }

    if (status === "ACTIVE") {
      where.isActive = true;
    } else if (status === "UNSUBSCRIBED") {
      where.isActive = false;
    }

    const subscribers = await prisma.newsletterSubscriber.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const totalCount = await prisma.newsletterSubscriber.count();
    const activeCount = await prisma.newsletterSubscriber.count({ where: { isActive: true } });

    return NextResponse.json({
      subscribers,
      stats: {
        total: totalCount,
        active: activeCount,
        unsubscribed: totalCount - activeCount,
      },
    });
  } catch (error: any) {
    console.error("Admin Newsletter GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}
