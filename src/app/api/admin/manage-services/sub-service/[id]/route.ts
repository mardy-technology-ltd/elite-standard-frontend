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
      let sliderImages: string[] = [];
      if (Array.isArray(service.subServices) && (service.subServices as any[]).length > 0) {
        // check if subServices stores gallery/sliderImages
        const first = (service.subServices as any[])[0];
        if (Array.isArray(first?.sliderImages)) {
          sliderImages = first.sliderImages;
        }
      }
      if (sliderImages.length === 0 && service.bannerImage) {
        sliderImages = [service.bannerImage];
      }

      const synthesized = {
        ...service,
        sliderImages,
        features: Array.isArray(service.scopeOfWork) ? service.scopeOfWork : [],
        faqs: Array.isArray(service.faqs) ? service.faqs : [],
      };

      return NextResponse.json({ success: true, service: synthesized, isEmbedded: false });
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
          const sliderImages = Array.isArray(found.sliderImages)
            ? found.sliderImages
            : found.image
            ? [found.image]
            : [];

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
            sliderImages,
            features: Array.isArray(found.features) ? found.features : [],
            scopeOfWork: Array.isArray(found.features) ? found.features : [],
            faqs: Array.isArray(found.faqs) ? found.faqs : (Array.isArray(flagship.faqs) ? flagship.faqs : []),
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
      const bannerImage = body.bannerImage || (Array.isArray(body.sliderImages) && body.sliderImages.length > 0 ? body.sliderImages[0] : existingDedicated.bannerImage);
      const sliderImages = Array.isArray(body.sliderImages) ? body.sliderImages : (bannerImage ? [bannerImage] : []);

      // If dedicated record has subServices, update or create a wrapper holding sliderImages
      const existingSubServices = Array.isArray(existingDedicated.subServices) ? existingDedicated.subServices : [];
      let updatedSubServices = existingSubServices;
      if (updatedSubServices.length > 0) {
        updatedSubServices = [
          {
            ...(updatedSubServices[0] as any),
            sliderImages,
            image: bannerImage,
          },
          ...updatedSubServices.slice(1),
        ];
      } else {
        updatedSubServices = [
          {
            id: `ss-${existingDedicated.slug}`,
            slug: existingDedicated.slug,
            image: bannerImage,
            sliderImages,
            title: body.title?.trim() || existingDedicated.title,
            features: Array.isArray(body.features) ? body.features : existingDedicated.scopeOfWork,
          },
        ];
      }

      const updated = await prisma.service.update({
        where: { id: existingDedicated.id },
        data: {
          title: body.title?.trim() || existingDedicated.title,
          subtitle: body.subtitle ?? existingDedicated.subtitle,
          shortDescription: body.shortDescription ?? existingDedicated.shortDescription,
          fullDescription: body.fullDescription ?? existingDedicated.fullDescription,
          bannerImage,
          scopeOfWork: Array.isArray(body.features) ? body.features : existingDedicated.scopeOfWork,
          subServices: updatedSubServices,
          faqs: Array.isArray(body.faqs) ? body.faqs : existingDedicated.faqs,
        },
      });

      // Also ensure parent flagship's subServices array is synchronized
      const parentSlug = body.parentFlagshipSlug;
      if (parentSlug) {
        const parent = await prisma.service.findFirst({
          where: { OR: [{ slug: parentSlug }, { code: parentSlug.toUpperCase() }] },
        });
        if (parent && Array.isArray(parent.subServices)) {
          const syncSub = (parent.subServices as any[]).map((sub) => {
            if (sub.slug === existingDedicated.slug || sub.id === existingDedicated.id || sub.id === `ss-${existingDedicated.slug}`) {
              return {
                ...sub,
                title: body.title?.trim() || existingDedicated.title,
                image: bannerImage,
                sliderImages,
                features: Array.isArray(body.features) ? body.features : sub.features,
                faqs: Array.isArray(body.faqs) ? body.faqs : sub.faqs,
              };
            }
            return sub;
          });
          await prisma.service.update({
            where: { id: parent.id },
            data: { subServices: syncSub },
          });
        }
      }

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
      const bannerImage = body.bannerImage || (Array.isArray(body.sliderImages) && body.sliderImages.length > 0 ? body.sliderImages[0] : '');
      const sliderImages = Array.isArray(body.sliderImages) ? body.sliderImages : (bannerImage ? [bannerImage] : []);

      const updatedSubServices = (parent.subServices as any[]).map((sub) => {
        if (sub.id === id || sub.slug === id) {
          return {
            ...sub,
            title: body.title?.trim() || sub.title,
            subtitle: body.subtitle ?? sub.subtitle,
            shortDesc: body.shortDescription ?? sub.shortDesc,
            fullDesc: body.fullDescription ?? sub.fullDesc,
            image: bannerImage || sub.image,
            sliderImages: sliderImages.length > 0 ? sliderImages : (sub.image ? [sub.image] : []),
            features: Array.isArray(body.features) ? body.features : sub.features,
            faqs: Array.isArray(body.faqs) ? body.faqs : sub.faqs,
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

