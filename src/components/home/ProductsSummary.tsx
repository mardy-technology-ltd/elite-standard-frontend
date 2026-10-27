"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { allProducts, CatalogProduct } from "@/app/products/ProductsClient";
import { FaTag, FaCheck, FaArrowRight, FaShieldAlt } from "react-icons/fa";

interface ProductsSummaryProps {
  initialProducts?: CatalogProduct[];
}

export default function ProductsSummary({ initialProducts }: ProductsSummaryProps) {
  // Use products from Database if available, otherwise fall back to allProducts from catalog
  const displayProducts =
    initialProducts && initialProducts.length > 0
      ? initialProducts.slice(0, 4)
      : allProducts.slice(0, 4);

  return (
    <section className="py-24 bg-gradient-to-b from-[#eef3f9] via-slate-100 to-[#eaf0f8] border-t border-slate-200/90 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
                Engineering Equipment Supply
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-950 tracking-tight leading-tight">
              Premium <span className="text-gradient">Products & Equipment</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              We import, fabricate, and distribute world-class MEP machinery, switchgear, fire safety pumps, and climate control units.
            </p>
          </div>

          <Link
            href="/products"
            className="group hidden md:inline-flex items-center gap-2 text-brand-800 hover:text-accent font-bold text-sm bg-white border border-slate-200 hover:bg-brand-900 px-5 py-3 rounded-lg shadow-sm transition-all duration-300"
          >
            <span>Explore All Products</span>
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product: CatalogProduct, idx: number) => {
            const productHref = product.href || `/products/${product.slug}`;

            return (
              <motion.div
                key={product.id || idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-card-hover hover:border-brand-800/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Product Thumbnail (Fixed 4:3 Aspect Ratio Container) */}
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-5 bg-slate-100 border border-slate-100 shrink-0">
                    <Image
                      src={product.image || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"}
                      alt={product.title}
                      fill
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    {product.stockBadge && (
                      <div className="absolute top-3 right-3 bg-brand-900/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-accent border border-accent/30 flex items-center gap-1">
                        <FaShieldAlt className="text-[9px]" />
                        <span>{product.stockBadge}</span>
                      </div>
                    )}
                  </div>

                  {/* Category Badge & Code */}
                  <div className="flex items-center justify-between gap-1.5 text-[11px] font-bold text-brand-800 uppercase tracking-wider mb-2">
                    <div className="flex items-center gap-1.5 truncate">
                      <FaTag className="text-accent text-[10px] shrink-0" />
                      <span className="truncate">{product.category}</span>
                    </div>
                    {product.code && (
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                        {product.code}
                      </span>
                    )}
                  </div>

                  {/* Title / Name */}
                  <h3 className="font-heading text-base font-bold text-brand-950 group-hover:text-brand-800 transition-colors mb-2 line-clamp-2">
                    <Link href={productHref} className="hover:text-accent transition-colors">
                      {product.title}
                    </Link>
                  </h3>

                  {/* Price & Variants Preview */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-black text-brand-900">
                      {product.priceFormatted || `Tk ${product.price?.toLocaleString()}`}
                    </span>
                    {product.variantsText && (
                      <span className="text-[11px] text-slate-500 font-medium">
                        {product.variantsText}
                      </span>
                    )}
                  </div>

                  {/* Specifications Key/Value preview */}
                  {Array.isArray(product.specs) && product.specs.length > 0 && (
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col gap-1.5 text-[11px] text-slate-700">
                      {product.specs.slice(0, 2).map((s, specIdx) => (
                        <div key={specIdx} className="flex justify-between items-center gap-2">
                          <span className="text-slate-500 font-medium truncate">{s.label}:</span>
                          <span className="font-semibold text-brand-950 truncate max-w-[55%] text-right">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Inquiry / View Details Button */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={productHref}
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-900 group-hover:bg-accent text-white group-hover:text-brand-950 font-bold text-xs py-2.5 rounded-lg transition-colors"
                  >
                    <span>View Specifications</span>
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 text-brand-800 hover:text-accent font-bold text-sm bg-white border border-slate-200 px-6 py-3 rounded-lg shadow-sm"
          >
            <span>Explore All Products</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </section>
  );
}
