import React from "react";
import prisma from "@/lib/prisma";
import ProductsClient, { CatalogProduct, allProducts } from "./ProductsClient";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  let products: CatalogProduct[] = allProducts;

  try {
    const dbProducts = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (dbProducts && dbProducts.length > 0) {
      products = dbProducts.map((p) => ({
        id: p.id,
        slug: p.slug,
        code: p.code,
        title: p.title,
        category: p.category as any,
        sector: (Array.isArray(p.sector) ? p.sector : [p.sector]) as any,
        price: p.price,
        priceFormatted: p.priceFormatted || `Tk ${p.price.toLocaleString()}`,
        inStock: p.inStock,
        stockBadge: p.stockBadge || undefined,
        image: p.image,
        variantsText: p.variantsText || "",
        specs: (Array.isArray(p.specs) ? p.specs : []) as any,
        href: p.href || `/products/${p.slug}`,
        iconName: p.iconName || "FaBoxes",
      }));
    }
  } catch (err) {
    console.error("Failed to query live products for SSR:", err);
  }

  return <ProductsClient initialProducts={products} />;
}
