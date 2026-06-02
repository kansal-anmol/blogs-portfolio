import type { Post as Blog } from '@/src/shared/types';

import { BlogCard } from '@/src/client/components/BlogCard';

type RelatedBlogsProps = {
	blogs: Blog[];
};

export const RelatedBlogs = ({ blogs }: RelatedBlogsProps) => {
	if (blogs.length === 0) return null;

	return (
		<section className="mt-6 flex flex-col gap-6 border-t border-[#222222] pt-12">
			<h3 className="font-heading text-xl font-black tracking-tight text-white">More blogs</h3>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
				{blogs.map((blog) => (
					<BlogCard key={blog.id} blog={blog} />
				))}
			</div>
		</section>
	);
};
