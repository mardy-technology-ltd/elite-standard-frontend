"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { productsData, ProductItem } from "@/lib/mockData";
import { FaTag, FaCheck, FaArrowRight } from "react-icons/fa";

interface ServiceRelatedProductsProps {
  serviceSlug: string;
}

export default function ServiceRelatedProducts({ serviceSlug }: ServiceRelatedProductsProps) {
  // Filter products by related service slug, fallback to first 3 products if empty
  const relatedProducts = productsData.filter(
    (prod: ProductItem) => prod.relatedServiceSlug === serviceSlug
  );

  const displayProducts =
    relatedProducts.length > 0 ? relatedProducts : productsData.slice(0, 3);

  return (
    <section className="py-20 sm:py-24 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
                System Equipment
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight leading-tight">
              Related Equipment & <span className="text-gradient">Products</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              We import, fabricate, and install certified machinery and switchgear built for this service.
            </p>
          </div>

          <Link
            href="/products"
            className="group hidden md:inline-flex items-center gap-2 text-brand-800 hover:text-accent font-bold text-sm bg-slate-50 border border-slate-200 hover:bg-brand-900 px-5 py-3 rounded-lg shadow-sm transition-all duration-300"
          >
            <span>View All Products</span>
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayProducts.map((product: ProductItem, idx: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-card-hover hover:border-brand-800/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Fixed Aspect Ratio Image Container */}
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-5 bg-slate-100 border border-slate-100 shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 bg-brand-900/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-accent border border-accent/30">
                    {product.brand}
                  </div>
                </div>

                {/* Category Badge */}
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-800 uppercase tracking-wider mb-2">
                  <FaTag className="text-accent text-[10px]" />
                  <span>{product.category}</span>
                </div>

                <h3 className="font-heading text-base font-bold text-brand-950 group-hover:text-brand-800 transition-colors mb-2 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href={`/products#${product.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-900 group-hover:bg-accent text-white group-hover:text-brand-950 font-bold text-xs py-2.5 rounded-lg transition-colors"
                >
                  <span>Inquire Specifications</span>
                  <FaCheck className="text-[10px]" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
