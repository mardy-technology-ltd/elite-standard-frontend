import React from "react";
import prisma from "@/lib/prisma";
import ProductDetailClient, {
  ProductDetailData,
  productDetailsMap,
} from "./ProductDetailClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: { category: string };
}) {
  const categoryParam = decodeURIComponent(params.category);

  // 1. Check Supabase Database first
  let dbProduct = null;
  try {
    dbProduct = await prisma.product.findFirst({
      where: {
        OR: [
          { slug: categoryParam },
          { code: { equals: categoryParam, mode: "insensitive" } },
          { id: categoryParam },
        ],
      },
    });
  } catch (err) {
    console.error("Error querying db for product detail:", err);
  }

  // 2. If found in database, construct complete ProductDetailData
  if (dbProduct) {
    const gallery =
      Array.isArray(dbProduct.galleryImages) && dbProduct.galleryImages.length > 0
        ? dbProduct.galleryImages
        : [dbProduct.image || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"];

    const quickSpecs =
      Array.isArray(dbProduct.specs) && dbProduct.specs.length > 0
        ? (dbProduct.specs as any)
        : [
            { label: "Category", value: dbProduct.category },
            { label: "Application", value: Array.isArray(dbProduct.sector) ? dbProduct.sector.join(", ") : "Industrial" },
            { label: "Model Code", value: dbProduct.code },
            { label: "Availability", value: dbProduct.inStock ? "In Stock" : "Made to Order" },
          ];

    const fullSpecs =
      Array.isArray(dbProduct.fullSpecs) && dbProduct.fullSpecs.length > 0
        ? (dbProduct.fullSpecs as any)
        : [
            { attribute: "Brand", value: dbProduct.brand || "Elite Standard Limited" },
            { attribute: "Model / Item Code", value: dbProduct.code },
            { attribute: "Category", value: dbProduct.category },
            { attribute: "Price", value: dbProduct.priceFormatted || `Tk ${dbProduct.price.toLocaleString()}` },
            { attribute: "Warranty", value: dbProduct.warranty || "2 Years Full OEM Service Warranty" },
            ...(Array.isArray(dbProduct.specs)
              ? (dbProduct.specs as any).map((s: any) => ({
                  attribute: s.label,
                  value: s.value,
                }))
              : []),
          ];

    const product: ProductDetailData = {
      slug: dbProduct.slug,
      code: dbProduct.code,
      title: dbProduct.title,
      brand: dbProduct.brand || "Elite Standard Limited",
      category: dbProduct.category,
      regularPrice:
        dbProduct.regularPrice ||
        `Tk ${Math.round(dbProduct.price * 1.15).toLocaleString()}`,
      specialPrice:
        dbProduct.priceFormatted || `Tk ${dbProduct.price.toLocaleString()}`,
      inStock: dbProduct.inStock,
      warranty: dbProduct.warranty || "2 Years OEM Service Warranty & 24/7 Support",
      galleryImages: gallery,
      quickSpecs,
      fullSpecs,
      descriptionBlocks: [
        {
          heading: `${dbProduct.title} - Engineering Overview`,
          text:
            dbProduct.description ||
            "Designed and fabricated according to international standards (BNBC, NFPA, ASHRAE, IEC). Includes factory testing, site installation, and comprehensive after-sales support.",
          image: gallery[0] || dbProduct.image,
          badge: dbProduct.category,
        },
      ],
      packages: [
        {
          tier: "Standard Engineering Package",
          capacity: dbProduct.variantsText || "Standard Sizing",
          application: "Commercial & Industrial Turnkey Application",
        },
      ],
    };

    return <ProductDetailClient product={product} />;
  }

  // 3. Fallback to existing static mock map
  const fallbackProduct =
    productDetailsMap[categoryParam] || productDetailsMap["iron-removal-plant"];

  if (!fallbackProduct) {
    notFound();
  }

  return <ProductDetailClient product={fallbackProduct} />;
}
