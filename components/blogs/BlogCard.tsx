import React from 'react';
import Link from 'next/link';
import { Post } from '@/lib/types';

interface BlogCardProps {
  post: Post;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const primaryTag = post.tags?.[0]?.name || 'Engineering';

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col h-full rounded-xl border border-[#222222] bg-[#111111] overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-[#333333] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
    >
      {/* 16:9 Aspect Ratio Header */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-900 border-b border-[#222222]">
        {post.coverImage?.url ? (
          <img
            src={post.coverImage.url}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
          />
        ) : (
          /* Dark primary tag fallback placeholder */
          <div className="w-full h-full bg-[#161616] flex items-center justify-center select-none">
            <span className="font-heading font-black text-sm uppercase tracking-widest text-[#b5f542] opacity-80">
              {primaryTag}
            </span>
          </div>
        )}
      </div>

      {/* Card Content Area */}
      <div className="p-4.5 flex flex-col justify-between flex-grow gap-4">
        <div className="flex flex-col gap-2">
          {/* Tag Pill Chip */}
          <div>
            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-[#1a1a1a] text-neutral-400 border border-[#222222] group-hover:border-[#b5f542]/20 group-hover:text-[#b5f542] transition-colors duration-300 uppercase tracking-wider">
              {primaryTag}
            </span>
          </div>

          {/* Post Title */}
          <h3 className="font-heading font-medium text-base text-neutral-100 group-hover:text-[#b5f542] transition-colors duration-300 line-clamp-2 leading-snug">
            {post.title}
          </h3>
        </div>

        {/* Date + Estimated Read Time */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
          <span>{formatDate(post.publishedAt)}</span>
          <span className="text-neutral-700">•</span>
          <span>{post.readTimeInMinutes} min read</span>
        </div>
      </div>
    </Link>
  );
};
