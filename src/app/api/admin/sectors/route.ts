import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

const defaultSectors = [
  {
    id: "sec1",
    slug: "commercial-corporate-towers",
    title: "Commercial & Corporate Towers",
    description: "Centralized HVAC, high-speed BBT power distribution, and NFPA life safety for multi-story office complexes.",
    icon: "FaBuilding",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    href: "/sectors",
    orderIndex: 1,
    isActive: true,
  },
  {
    id: "sec2",
    slug: "pharmaceuticals-cleanrooms",
    title: "Pharmaceuticals & Cleanrooms",
    description: "ISO 7 cleanroom HVAC, HEPA filtration, positive pressure control, and purified water piping.",
    icon: "FaFlaskVial",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    href: "/sectors",
    orderIndex: 2,
    isActive: true,
  },
  {
    id: "sec3",
    slug: "industrial-plants-textiles",
    title: "Industrial Plants & Textiles",
    description: "Heavy-duty power distribution panels, high-pressure fire hydrants, biological ETPs, and SCADA automation.",
    icon: "FaIndustry",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop",
    href: "/sectors",
    orderIndex: 3,
    isActive: true,
  },
  {
    id: "sec4",
    slug: "healthcare-hospitals",
    title: "Healthcare & Hospitals",
    description: "Medical gas pipelines, isolated power systems (IPS), emergency generator sync, and laminar airflow operating rooms.",
    icon: "FaHospital",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    href: "/sectors",
    orderIndex: 4,
    isActive: true,
  },
  {
    id: "sec5",
    slug: "data-centers-telecom",
    title: "Data Centers & Telecom",
    description: "Precision AC cooling, N+1 redundant generator banks, FM200 gas suppression, and power monitoring.",
    icon: "FaServer",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    href: "/sectors",
    orderIndex: 5,
    isActive: true,
  },
  {
    id: "sec6",
    slug: "renewable-energy-solar",
    title: "Renewable Energy & Solar",
    description: "Industrial rooftop solar PV arrays, net metering integration, and high-efficiency inverter synchronization.",
    icon: "FaSun",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop",
    href: "/sectors",
    orderIndex: 6,
    isActive: true,
  },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const activeOnly = searchParams.get("activeOnly") === "true";

    const where: any = {};
    if (activeOnly) {
      where.isActive = true;
    }
    if (search.trim()) {
      where.OR = [
        { title: { contains: search.trim(), mode: "insensitive" } },
        { description: { contains: search.trim(), mode: "insensitive" } },
      ];
    }

    let items = await prisma.industrySector.findMany({
      where,
      orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
    });

    // Auto-seed if database table is completely empty
    if (items.length === 0 && !search.trim()) {
      const count = await prisma.industrySector.count();
      if (count === 0) {
        for (const item of defaultSectors) {
          await prisma.industrySector.create({
            data: {
              slug: item.slug,
              title: item.title,
              description: item.description,
              icon: item.icon,
              image: item.image,
              href: item.href,
              orderIndex: item.orderIndex,
              isActive: item.isActive,
            },
          });
        }
        items = await prisma.industrySector.findMany({
          where: activeOnly ? { isActive: true } : {},
          orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
        });
      }
    }

    const totalCount = await prisma.industrySector.count();
    const activeCount = await prisma.industrySector.count({ where: { isActive: true } });

    return NextResponse.json({
      success: true,
      items,
      stats: {
        total: totalCount,
        active: activeCount,
      },
    });
  } catch (error: any) {
    console.error("Admin Sectors GET Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch sectors" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, icon = "FaBuilding", image, href = "/sectors", orderIndex = 0, isActive = true } = body;

    if (!title || !description || !image) {
      return NextResponse.json(
        { error: "Title, description, and image are required" },
        { status: 400 }
      );
    }

    const slug = (body.slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const newSector = await prisma.industrySector.create({
      data: {
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        title: title.trim(),
        description: description.trim(),
        icon: icon || "FaBuilding",
        image: image.trim(),
        href: href || "/sectors",
        orderIndex: Number(orderIndex) || 0,
        isActive: Boolean(isActive),
      },
    });

    return NextResponse.json({
      success: true,
      item: newSector,
    });
  } catch (error: any) {
    console.error("Admin Sectors POST Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create sector" },
      { status: 500 }
    );
  }
}
