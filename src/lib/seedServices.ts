import prisma from "@/lib/prisma";
import { servicesData } from "@/lib/mockData";

export async function seedAllServices() {
  console.log("Seeding all services from mockData into DB...");
  let count = 0;

  for (const s of servicesData) {
    // 1. Seed the Flagship Service itself
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        code: s.code,
        category: s.category,
        title: s.title,
        subtitle: s.subtitle,
        shortDescription: s.shortDescription,
        fullDescription: s.fullDescription,
        icon: s.icon,
        bannerImage: s.bannerImage,
        compliance: s.compliance,
        problems: s.problems,
        solutions: s.solutions,
        scopeOfWork: s.scopeOfWork,
        subServices: s.subServices as any,
        faqs: s.faqs as any,
        orderIndex: count++,
      },
      create: {
        id: s.id,
        slug: s.slug,
        code: s.code,
        category: s.category,
        title: s.title,
        subtitle: s.subtitle,
        shortDescription: s.shortDescription,
        fullDescription: s.fullDescription,
        icon: s.icon,
        bannerImage: s.bannerImage,
        compliance: s.compliance,
        problems: s.problems,
        solutions: s.solutions,
        scopeOfWork: s.scopeOfWork,
        subServices: s.subServices as any,
        faqs: s.faqs as any,
        orderIndex: count++,
      },
    });

    // 2. Also seed each sub-service as an individually editable service in admin panel
    if (Array.isArray(s.subServices)) {
      for (const sub of s.subServices) {
        const subSlug = sub.slug;
        const subCode = `ESL-MEP-${s.code}-${subSlug.toUpperCase().slice(0, 4)}`;

        await prisma.service.upsert({
          where: { slug: subSlug },
          update: {
            code: subCode,
            category: s.category,
            title: sub.title,
            subtitle: sub.shortDesc,
            shortDescription: sub.shortDesc,
            fullDescription: sub.fullDesc || sub.shortDesc,
            icon: s.icon,
            bannerImage: sub.image || s.bannerImage,
            compliance: s.compliance,
            scopeOfWork: sub.features || [],
            problems: s.problems || [],
            solutions: s.solutions || [],
            orderIndex: count++,
          },
          create: {
            id: sub.id,
            slug: subSlug,
            code: subCode,
            category: s.category,
            title: sub.title,
            subtitle: sub.shortDesc,
            shortDescription: sub.shortDesc,
            fullDescription: sub.fullDesc || sub.shortDesc,
            icon: s.icon,
            bannerImage: sub.image || s.bannerImage,
            compliance: s.compliance,
            scopeOfWork: sub.features || [],
            problems: s.problems || [],
            solutions: s.solutions || [],
            orderIndex: count++,
          },
        });
      }
    }
  }

  console.log(`Successfully seeded ${count} services into database.`);
  return count;
}
