import { NextResponse } from "next/server";
import { seedAllServices } from "@/lib/seedServices";
import { getSessionAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const admin = await getSessionAdmin();
    // Allow if authenticated admin or in development
    const isDev = process.env.NODE_ENV !== "production";
    if (!admin && !isDev) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const count = await seedAllServices();
    return NextResponse.json({ success: true, count, message: `Seeded ${count} services successfully` });
  } catch (error: any) {
    console.error("Seeding error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const count = await seedAllServices();
    return NextResponse.json({ success: true, count, message: `Seeded ${count} services successfully` });
  } catch (error: any) {
    console.error("Seeding error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
