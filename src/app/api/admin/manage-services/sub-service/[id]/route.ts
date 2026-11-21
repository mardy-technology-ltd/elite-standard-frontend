import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // 1. Try finding dedicated Service record by id or slug
    let service = await prisma.service.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (service) {
      return NextResponse.json({ success: true, service, isEmbedded: false });
    }

    // 2. Check if it's an embedded subService in any root flagship service
    const allFlagships = await prisma.service.findMany({
      where: {
        subServices: { not: undefined },
      },
    });

    for (const flagship of allFlagships) {
      if (Array.isArray(flagship.subServices)) {
        const found = (flagship.subServices as any[]).find(
          (sub) => sub.id === id || sub.slug === id
        );

        if (found) {
          const synthesizedService = {
            id: found.id || id,
            slug: found.slug || id,
            code: `${flagship.code}-${(found.slug || 'SUB').toUpperCase()}`,
            category: flagship.category,
            title: found.title || found.name || 'Untitled Service',
            subtitle: found.subtitle || found.shortDesc || '',
            shortDescription: found.shortDesc || found.fullDesc || '',
            fullDescription: found.fullDesc || found.shortDesc || '',
            bannerImage: found.image || flagship.bannerImage || '',
            features: Array.isArray(found.features) ? found.features : [],
            scopeOfWork: Array.isArray(found.features) ? found.features : [],
            compliance: flagship.compliance || [],
            parentFlagshipId: flagship.id,
            parentFlagshipSlug: flagship.slug,
            parentFlagshipCode: flagship.code,
            isEmbedded: true,
          };

          return NextResponse.json({
            success: true,
            service: synthesizedService,
            isEmbedded: true,
            parentFlagshipId: flagship.id,
          });
        }
      }
    }

    return NextResponse.json({ error: 'Sub-Service not found' }, { status: 404 });
  } catch (error: any) {
    console.error('Fetch sub-service error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await req.json();

    // 1. Check if dedicated Service record exists
    const existingDedicated = await prisma.service.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (existingDedicated) {
      const updated = await prisma.service.update({
        where: { id: existingDedicated.id },
        data: {
          title: body.title?.trim() || existingDedicated.title,
          subtitle: body.subtitle ?? existingDedicated.subtitle,
          shortDescription: body.shortDescription ?? existingDedicated.shortDescription,
          fullDescription: body.fullDescription ?? existingDedicated.fullDescription,
          bannerImage: body.bannerImage ?? existingDedicated.bannerImage,
          scopeOfWork: Array.isArray(body.features) ? body.features : existingDedicated.scopeOfWork,
          subServices: body.subServices ?? existingDedicated.subServices,
        },
      });

      return NextResponse.json({ success: true, service: updated });
    }

    // 2. If it is an embedded subService inside a flagship service, update inside parent's subServices JSON array
    const parentFlagshipId = body.parentFlagshipId;
    let parent = null;

    if (parentFlagshipId) {
      parent = await prisma.service.findUnique({ where: { id: parentFlagshipId } });
    }

    if (!parent) {
      const allFlagships = await prisma.service.findMany();
      for (const f of allFlagships) {
        if (Array.isArray(f.subServices)) {
          const match = (f.subServices as any[]).find((s) => s.id === id || s.slug === id);
          if (match) {
            parent = f;
            break;
          }
        }
      }
    }

    if (parent && Array.isArray(parent.subServices)) {
      const updatedSubServices = (parent.subServices as any[]).map((sub) => {
        if (sub.id === id || sub.slug === id) {
          return {
            ...sub,
            title: body.title?.trim() || sub.title,
            subtitle: body.subtitle ?? sub.subtitle,
            shortDesc: body.shortDescription ?? sub.shortDesc,
            fullDesc: body.fullDescription ?? sub.fullDesc,
            image: body.bannerImage ?? sub.image,
            features: Array.isArray(body.features) ? body.features : sub.features,
          };
        }
        return sub;
      });

      await prisma.service.update({
        where: { id: parent.id },
        data: {
          subServices: updatedSubServices,
        },
      });

      return NextResponse.json({ success: true, message: 'Embedded sub-service updated' });
    }

    return NextResponse.json({ error: 'Target Sub-Service not found' }, { status: 404 });
  } catch (error: any) {
    console.error('Update sub-service error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

