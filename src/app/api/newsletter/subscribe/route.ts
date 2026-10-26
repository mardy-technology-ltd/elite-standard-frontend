import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, interest = "all", source = "website" } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = typeof name === "string" && name.trim() ? name.trim() : null;
    const cleanInterest = typeof interest === "string" ? interest : "all";
    const cleanSource = typeof source === "string" ? source : "website";

    // Upsert or find existing
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      if (!existing.isActive) {
        // Re-activate
        await prisma.newsletterSubscriber.update({
          where: { id: existing.id },
          data: {
            isActive: true,
            name: cleanName || existing.name,
            interest: cleanInterest || existing.interest,
          },
        });
        return NextResponse.json({
          success: true,
          message: "Welcome back! Your subscription has been reactivated.",
          alreadySubscribed: false,
        });
      }

      return NextResponse.json({
        success: true,
        message: "You are already subscribed to our engineering updates.",
        alreadySubscribed: true,
      });
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email: cleanEmail,
        name: cleanName,
        interest: cleanInterest,
        source: cleanSource,
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to Elite Standard Limited newsletters!",
      subscriberId: subscriber.id,
    });
  } catch (error: any) {
    console.error("Newsletter Subscription API Error:", error);
    return NextResponse.json(
      { error: "Failed to process subscription. Please try again later." },
      { status: 500 }
    );
  }
}
