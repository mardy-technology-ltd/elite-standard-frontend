import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { projectsData, blogsData } from '../src/lib/mockData';
import { allProducts } from '../src/app/products/page';

const prisma = new PrismaClient();

async function main() {
  console.log('--- STARTING DATABASE SEED ---');

  // 1. Create Default Admin User
  const adminEmail = 'admin@elitestandard.com';
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('EliteAdmin2025!', 10);
    const admin = await prisma.adminUser.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: 'Elite Super Admin',
        role: 'SUPER_ADMIN',
      },
    });
    console.log(`✔ Admin created: ${admin.email} (Password: EliteAdmin2025!)`);
  } else {
    console.log(`ℹ Admin already exists: ${existingAdmin.email}`);
  }

  // 2. Seed Products (12 Rich Catalog Products)
  console.log(`Seeding ${allProducts.length} products...`);
  for (const item of allProducts) {
    await prisma.product.upsert({
      where: { code: item.code },
      update: {
        id: item.id,
        slug: item.slug,
        title: item.title,
        category: item.category,
        sector: item.sector,
        price: item.price,
        priceFormatted: item.priceFormatted,
        inStock: item.inStock,
        stockBadge: item.stockBadge,
        image: item.image,
        variantsText: item.variantsText,
        specs: item.specs as any,
        href: item.href,
        iconName: item.iconName,
      },
      create: {
        id: item.id,
        slug: item.slug,
        code: item.code,
        title: item.title,
        category: item.category,
        sector: item.sector,
        price: item.price,
        priceFormatted: item.priceFormatted,
        inStock: item.inStock,
        stockBadge: item.stockBadge,
        image: item.image,
        variantsText: item.variantsText,
        specs: item.specs as any,
        href: item.href,
        iconName: item.iconName,
      },
    });
  }
  console.log(`✔ ${allProducts.length} products seeded successfully.`);

  // 3. Seed Projects (Landmark Portfolios)
  console.log(`Seeding ${projectsData.length} projects...`);
  for (const proj of projectsData) {
    await prisma.project.upsert({
      where: { slug: proj.slug },
      update: {
        title: proj.title,
        category: proj.category,
        client: proj.client,
        location: proj.location,
        completionDate: proj.completionDate,
        description: proj.description,
        image: proj.image,
        gallery: (proj.gallery || []) as any,
        scope: proj.scope || [],
      },
      create: {
        id: proj.id,
        slug: proj.slug,
        title: proj.title,
        category: proj.category,
        client: proj.client,
        location: proj.location,
        completionDate: proj.completionDate,
        description: proj.description,
        image: proj.image,
        gallery: (proj.gallery || []) as any,
        scope: proj.scope || [],
      },
    });
  }
  console.log(`✔ ${projectsData.length} projects seeded successfully.`);

  // 4. Seed Blogs
  console.log(`Seeding ${blogsData.length} blogs...`);
  for (const blog of blogsData) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: {
        title: blog.title,
        category: blog.category,
        author: blog.author,
        publishedAt: blog.publishedAt,
        readTime: blog.readTime,
        summary: blog.summary,
        content: blog.content,
        image: blog.image,
      },
      create: {
        id: blog.id,
        slug: blog.slug,
        title: blog.title,
        category: blog.category,
        author: blog.author,
        publishedAt: blog.publishedAt,
        readTime: blog.readTime,
        summary: blog.summary,
        content: blog.content,
        image: blog.image,
      },
    });
  }
  console.log(`✔ ${blogsData.length} blogs seeded successfully.`);

  // 5. Seed Initial Sample Inquiries
  const sampleInquiryCount = await prisma.inquiry.count();
  if (sampleInquiryCount === 0) {
    await prisma.inquiry.createMany({
      data: [
        {
          type: 'quotation',
          productName: 'Commercial Water Treatment Plant RO 5000LPH',
          name: 'Engr. Rafiqul Islam',
          phone: '+880 1711 000111',
          email: 'rafiqul@squaregroup.com',
          facility: 'Industrial Processing Plant, Gazipur',
          message: 'Need urgent technical consultation and price estimation for RO water plant.',
          status: 'PENDING',
        },
        {
          type: 'consultation',
          productName: 'UL/FM Certified Fire Pump Skid',
          name: 'Col. (Retd.) Tariq Mahmud',
          phone: '+880 1819 223344',
          email: 'tariq@epylliongroup.com',
          facility: 'RMG Garments Factory Complex, Narayanganj',
          message: 'Compliance requirement for BNBC & NFPA 20 inspection. Please call me.',
          status: 'CONTACTED',
        },
        {
          type: 'contact',
          productName: 'Low Voltage (LT) Main Power Switchboard',
          name: 'M. A. Bashar',
          phone: '+880 1912 334455',
          email: 'bashar@apexholdings.com',
          facility: 'Corporate HQ, Tejgaon I/A',
          message: 'Looking for 2500A Form-4 type-tested LT board quotation.',
          status: 'PENDING',
        },
      ],
    });
    console.log(`✔ Sample inquiries created.`);
  }

  console.log('--- SEEDING COMPLETED SUCCESSFULLY ---');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
