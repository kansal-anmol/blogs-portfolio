import { Post } from '../lib/types';
import { PostPreview } from './post-preview';

type Props = {
	posts: Post[];
	context: 'home' | 'series' | 'tag';
};

export const MorePosts = ({ posts, context }: Props) => {
	return (
		<section className="mb-10 flex flex-col items-start gap-10">
			{context === 'home' && (
				<h2 className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-neutral-50 lg:text-3xl">
					More Posts
				</h2>
			)}
			<div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
				{posts.map((post) => (
					<PostPreview
						key={post.slug}
						title={post.title}
						coverImage={post.coverImage?.url}
						date={post.publishedAt}
						author={post.author || { id: '', name: '', username: '', profilePicture: '' }}
						slug={post.slug}
						excerpt={post.brief}
					/>
				))}
			</div>
		</section>
	);
};
