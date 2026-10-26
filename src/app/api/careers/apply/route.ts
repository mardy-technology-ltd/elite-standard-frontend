import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.fullName || !data.email || !data.phone || !data.positionTitle) {
      return NextResponse.json(
        { error: 'Full Name, Email, Phone, and Position are required' },
        { status: 400 }
      );
    }

    const application = await prisma.jobApplication.create({
      data: {
        jobPositionId: data.jobPositionId || null,
        positionTitle: data.positionTitle,
        fullName: data.fullName.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        experience: data.experience || '',
        resumeUrl: data.resumeUrl || null,
        coverNote: data.coverNote || '',
        status: 'NEW',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application.id,
    });
  } catch (error: any) {
    console.error('Job application error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
      { status: 500 }
    );
  }
}
