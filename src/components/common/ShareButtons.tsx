"use client";

import React, { useState } from "react";
import { FaTwitter, FaLinkedinIn, FaFacebookF, FaLink, FaCheck } from "react-icons/fa";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const shareLinks = [
    { name: 'Twitter', icon: FaTwitter, href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=` },
    { name: 'LinkedIn', icon: FaLinkedinIn, href: `https://www.linkedin.com/sharing/share-offsite/?url=` },
    { name: 'Facebook', icon: FaFacebookF, href: `https://www.facebook.com/sharer/sharer.php?u=` }
  ];

  const handleSocialShare = (href: string) => {
    window.open(href + encodeURIComponent(window.location.href), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex items-center gap-3">
      {shareLinks.map((platform) => {
        const Icon = platform.icon;
        return (
          <button
            key={platform.name}
            onClick={() => handleSocialShare(platform.href)}
            title={`Share on ${platform.name}`}
            className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-brand-900 hover:border-brand-900 hover:bg-white transition-all shadow-sm"
          >
            <Icon className="text-sm" />
          </button>
        );
      })}
      
      <button
        onClick={handleCopy}
        title="Copy Link"
        className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-accent hover:border-accent hover:bg-white transition-all shadow-sm"
      >
        {copied ? <FaCheck className="text-sm text-green-500" /> : <FaLink className="text-sm" />}
      </button>
    </div>
  );
}
