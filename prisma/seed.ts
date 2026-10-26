import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { projectsData, blogsData, servicesData } from '../src/lib/mockData';
import { allProducts } from '../src/app/products/ProductsClient';

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

  // 6. Seed MEP Services (9 Core Disciplines)
  console.log(`Seeding ${servicesData.length} MEP services...`);
  for (let i = 0; i < servicesData.length; i++) {
    const s = servicesData[i];
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
        compliance: s.compliance || [],
        problems: s.problems || [],
        solutions: s.solutions || [],
        scopeOfWork: s.scopeOfWork || [],
        subServices: (s.subServices || []) as any,
        faqs: (s.faqs || []) as any,
        sectors: (s.sectors || null) as any,
        orderIndex: i,
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
        compliance: s.compliance || [],
        problems: s.problems || [],
        solutions: s.solutions || [],
        scopeOfWork: s.scopeOfWork || [],
        subServices: (s.subServices || []) as any,
        faqs: (s.faqs || []) as any,
        sectors: (s.sectors || null) as any,
        orderIndex: i,
      },
    });
  }
  console.log(`✔ ${servicesData.length} MEP services seeded successfully.`);

  // 7. Seed Careers & Recruitment Job Positions
  const initialJobs = [
    {
      id: "hvac-sr",
      slug: "senior-mechanical-engineer-hvac",
      title: "Senior Mechanical Engineer (HVAC & Cleanrooms)",
      department: "Mechanical Engineering (HVAC)",
      location: "Amtola / Banani, Dhaka",
      type: "Full Time",
      experience: "4 - 7 Years",
      salary: "BDT 75,000 - 1,10,000 / Month (Negotiable)",
      salaryBadge: "BDT 75,000 - 1,10,000 / Month",
      summary:
        "Lead HVAC heat load calculation (Carrier HAP), VRF system layout design, chiller plant piping schematics, and ISO Class 7/8 pharmaceutical cleanroom air balancing.",
      qualifications: [
        "B.Sc. in Mechanical Engineering from a recognized university (BUET/CUET/RUET/KUET/AUST preferred)",
        "Proficient in Carrier HAP, AutoCAD MEP, and duct sizing tools",
        "Hands-on experience in VRF multi-split installation and chilled water piping commissioning",
        "Knowledge of BNBC 2020 and ASHRAE 62.1 / 90.1 standards",
      ],
      responsibilities: [
        "Design VRF, chiller, and cleanroom HVAC schematics",
        "Supervise site execution and air balancing commissioning",
        "Liaise with clients for technical submittals and approvals",
      ],
      isActive: true,
      orderIndex: 1,
    },
    {
      id: "switchgear-eng",
      slug: "electrical-switchgear-design-engineer",
      title: "Electrical Switchgear Design Engineer (LT/HT Panels)",
      department: "Power Distribution & Panels (PDCP)",
      location: "Dhaka Factory & Site",
      type: "Full Time",
      experience: "3 - 5 Years",
      salary: "BDT 55,000 - 85,000 / Month (Negotiable)",
      salaryBadge: "BDT 55,000 - 85,000 / Month",
      summary:
        "Design Form-4 type tested Low Voltage switchgear panels, HT 11kV VCB substations, Automatic PFI capacitor banks, and motor control centers (MCC).",
      qualifications: [
        "B.Sc. in Electrical & Electronic Engineering (EEE)",
        "Strong proficiency in single-line diagrams (SLD), busbar calculation, and AutoCAD Electrical",
        "Familiarity with ABB, Schneider, and Siemens circuit breakers & digital power meters",
        "Sound understanding of IEC 61439-1/2 and BNBC electrical safety codes",
      ],
      responsibilities: [
        "Prepare GA drawings and wiring schematics for LT/HT switchboards",
        "Perform short-circuit and temperature rise calculations",
        "Conduct factory acceptance tests (FAT) before dispatch",
      ],
      isActive: true,
      orderIndex: 2,
    },
    {
      id: "fire-safety-eng",
      slug: "fire-protection-life-safety-engineer",
      title: "Fire Protection & Life Safety Engineer (NFPA / FSCD)",
      department: "Fire Detection & Protection (FDPS)",
      location: "Project Sites (Dhaka & Environs)",
      type: "Full Time",
      experience: "3 - 6 Years",
      salary: "BDT 60,000 - 90,000 / Month (Negotiable)",
      salaryBadge: "BDT 60,000 - 90,000 / Month",
      summary:
        "Execute wet-pipe sprinkler hydraulic calculations, high-pressure hydrant network layout, clean-agent (FM200) gas suppression, and FSCD statutory clearance documentation.",
      qualifications: [
        "B.Sc. in Mechanical or Chemical Engineering",
        "In-depth working knowledge of NFPA 13, 14, 20, and BNBC Part 4 requirements",
        "Experience with UL/FM certified electric & diesel fire pump skid commissioning",
        "Track record of successful Fire Service & Civil Defence (FSCD) safety audits",
      ],
      responsibilities: [
        "Hydraulic calculations for sprinkler and hydrant networks",
        "Installation supervision of fire suppression systems and pump skids",
        "Prepare documentation and liaise with FSCD inspectors for licensing",
      ],
      isActive: true,
      orderIndex: 3,
    },
    {
      id: "automation-eng",
      slug: "bms-industrial-automation-engineer",
      title: "BMS & Industrial Automation Engineer (PLC / SCADA)",
      department: "Industrial Building Automation (IBA)",
      location: "Amtola Headquarters, Dhaka",
      type: "Full Time",
      experience: "2 - 4 Years",
      salary: "BDT 50,000 - 75,000 / Month (Negotiable)",
      salaryBadge: "BDT 50,000 - 75,000 / Month",
      summary:
        "Program Siemens S7-1200/1500 and Schneider Modicon PLCs, develop SCADA graphics, and integrate IoT field transmitters with central building management systems.",
      qualifications: [
        "B.Sc. in EEE, Mechatronics, or CSE/ETE",
        "Proven experience in TIA Portal, WinCC SCADA, or Wonderware InTouch",
        "Hands-on configuration of Modbus RTU/TCP, BACnet, and Profibus communication protocols",
        "Knowledge of VFD speed modulation, energy telemetry, and automated damper interlocks",
      ],
      responsibilities: [
        "PLC logic development and HMI/SCADA screen design",
        "Field instrument calibration and loop testing",
        "BMS protocol integration with HVAC chillers, VFDs, and power meters",
      ],
      isActive: true,
      orderIndex: 4,
    },
  ];

  console.log(`Seeding ${initialJobs.length} career positions...`);
  for (const job of initialJobs) {
    await prisma.jobPosition.upsert({
      where: { slug: job.slug },
      update: {
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        experience: job.experience,
        salary: job.salary,
        salaryBadge: job.salaryBadge,
        summary: job.summary,
        qualifications: job.qualifications,
        responsibilities: job.responsibilities,
        isActive: job.isActive,
        orderIndex: job.orderIndex,
      },
      create: {
        id: job.id,
        slug: job.slug,
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        experience: job.experience,
        salary: job.salary,
        salaryBadge: job.salaryBadge,
        summary: job.summary,
        qualifications: job.qualifications,
        responsibilities: job.responsibilities,
        isActive: job.isActive,
        orderIndex: job.orderIndex,
      },
    });
  }
  console.log(`✔ ${initialJobs.length} career positions seeded successfully.`);

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
