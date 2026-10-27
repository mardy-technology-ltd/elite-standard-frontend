import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where: any = { isActive: true };

    if (category && category !== 'all') {
      where.category = { contains: category, mode: 'insensitive' };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } },
        { issue: { contains: search, mode: 'insensitive' } },
      ];
    }

    let bulletins = await prisma.engineeringBulletin.findMany({
      where,
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
    });

    // If database table is empty, auto-seed the default 4 flagship engineering bulletins
    if (bulletins.length === 0 && !category && !search) {
      const initialBulletins = [
        {
          id: 'bulletin-24',
          issue: 'Bulletin #24 — Q3 Edition',
          title: 'Tropical VRF Air Conditioning: Optimizing COP & Energy in High Ambient Temperatures',
          category: 'HVAC & Thermal Dynamics',
          date: 'October 2026',
          readTime: '6 min read',
          summary:
            'A deep dive into maintaining seasonal energy efficiency ratios (EER) and high COP in VRF multi-split systems operating under ambient temperatures exceeding 48°C in tropical Bangladesh conditions.',
          highlights: [
            'Inverter compressor frequency modulation curves',
            'Oil recovery cycle timing without thermal shock',
            'Modbus/BACnet BMS telemetry integration',
          ],
          pdfUrl: '',
          isActive: true,
          orderIndex: 1,
        },
        {
          id: 'bulletin-23',
          issue: 'Bulletin #23 — Q3 Edition',
          title: 'BNBC 2020 & NFPA 20 Compliance: Fire Hydrant & Automatic Sprinkler Standards',
          category: 'Life Safety & Protection',
          date: 'September 2026',
          readTime: '8 min read',
          summary:
            'A comprehensive checklist for engineering consultants and facility managers to ensure commercial high-rises meet FSCD statutory clearances and NFPA wet-pipe sprinkler hydraulic calculations.',
          highlights: [
            'Standpipe hydraulic pressure balancing at upper levels',
            'UL/FM listed diesel vs electric main pump redundancy',
            'FSCD inspection clearance procedures in Dhaka',
          ],
          pdfUrl: '',
          isActive: true,
          orderIndex: 2,
        },
        {
          id: 'bulletin-22',
          issue: 'Bulletin #22 — Q2 Edition',
          title: 'Industrial Groundwater Treatment: Iron Removal & Desalination for Textile Plants',
          category: 'Water Treatment (WTS)',
          date: 'August 2026',
          readTime: '7 min read',
          summary:
            'Comparing catalytic oxidation filtration with ion-exchange aeration for removing dissolved Fe > 8 mg/L and high manganese across industrial zones in Gazipur, Savar, and Narayanganj.',
          highlights: [
            'Birm vs Manganese Greensand media longevity',
            'Backwash frequency calculation for 30,000 LPH plants',
            'Pure RO integration for boiler feedwater standards',
          ],
          pdfUrl: '',
          isActive: true,
          orderIndex: 3,
        },
        {
          id: 'bulletin-21',
          issue: 'Bulletin #21 — Q2 Edition',
          title: 'Form-4 Type Tested Switchgear Panels: Protecting High-Capacity Production Lines',
          category: 'Electrical & Switchgear',
          date: 'July 2026',
          readTime: '5 min read',
          summary:
            'Why Form-4B compartmentation is vital in 2500A-4000A LT main distribution boards to prevent internal arc fault propagation and protect operating personnel in continuous factories.',
          highlights: [
            'Separation of busbars from functional units & terminals',
            'Automatic PFI capacitor bank thermal dissipation',
            'Type test verification according to IEC 61439-1/2',
          ],
          pdfUrl: '',
          isActive: true,
          orderIndex: 4,
        },
      ];

      for (const item of initialBulletins) {
        await prisma.engineeringBulletin.create({ data: item });
      }

      bulletins = await prisma.engineeringBulletin.findMany({
        where,
        orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
      });
    }

    return NextResponse.json({ success: true, bulletins });
  } catch (error: any) {
    console.error('Public Bulletins GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch engineering bulletins' },
      { status: 500 }
    );
  }
}
