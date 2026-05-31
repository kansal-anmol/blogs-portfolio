import { resizeImage } from '@/utils/image';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { Container } from '@/components/container';
import { AppProvider } from '@/components/contexts/appContext';
import { CoverImage } from '@/components/cover-image';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Layout } from '@/components/layout';
import { MorePosts } from '@/components/more-posts';
import type { Post, Publication, Series } from '../../lib/types';
import { DEFAULT_COVER } from '../../utils/const';
import { getAllPosts } from '@/lib/local-blogs';
import { getPublicationData } from '@/lib/local-publication';

type Props = {
	series: Series;
	posts: Post[];
	publication: Publication;
};

export default function Post({ series, publication, posts }: Props) {
	const title = `${series.name} - ${publication.title}`;

	return (
		<AppProvider publication={publication} series={series}>
			<Layout>
				<Head>
					<title>{title}</title>
				</Head>
				<Header />
				<Container className="flex flex-col items-stretch gap-10 px-5 pb-10">
					<div
						className={`${
							series.coverImage ? 'col-span-full' : 'col-span-3'
						} grid grid-cols-4 pt-5 md:gap-5`}
					>
						<div className="col-span-full flex flex-col gap-1 md:col-span-2 lg:col-span-3">
							<p className="font-bold uppercase text-slate-500 dark:text-neutral-400">Series</p>
							<h1 className="text-4xl font-bold text-slate-900 dark:text-neutral-50">
								{series.name}
							</h1>
							<div
								className="hashnode-content-style"
								dangerouslySetInnerHTML={{ __html: series.description?.html ?? '' }}
							></div>
						</div>
						<div className="relative col-span-full md:col-span-2 lg:col-span-1">
							<CoverImage
								title={series.name}
								src={resizeImage(
									series.coverImage,
									{
										w: 400,
										h: 210,
										c: 'thumb',
									},
									DEFAULT_COVER,
								)}
							/>
						</div>
					</div>
					{posts.length > 0 ? (
						<MorePosts context="series" posts={posts} />
					) : (
						<div>No Posts found</div>
					)}
				</Container>
				<Footer />
			</Layout>
		</AppProvider>
	);
}

type Params = {
	slug: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
	if (!params) {
		throw new Error('No params');
	}

	const publication = getPublicationData();
	const seriesSlug = params.slug;
	const series: Series = {
		id: seriesSlug,
		name: seriesSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
		slug: seriesSlug,
		description: {
			html: `<p>A beautiful collection of posts in the ${seriesSlug} series.</p>`,
		},
		coverImage: null,
	};

	return {
		props: {
			series,
			posts: [],
			publication,
		},
		revalidate: 60,
	};
};

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: [],
		fallback: 'blocking',
	};
};
