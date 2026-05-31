import { getSitemap } from '@/utils/seo/sitemap';
import { GetServerSideProps } from 'next';
import { getAllPosts } from '@/lib/local-blogs';
import { getPublicationData } from '@/lib/local-publication';

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { res } = ctx;

	const publication = getPublicationData();
	const posts = await getAllPosts();

	const xml = getSitemap({
		...publication,
		staticPages: {
			edges: [],
		},
		posts,
	});

	res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
	res.setHeader('content-type', 'text/xml');
	res.write(xml);
	res.end();

	return { props: {} };
};

export default Sitemap;
