import { constructRSSFeedFromPosts } from '@/utils/feed';
import { GetServerSideProps } from 'next';
import { getAllPosts, getPostBySlug } from '@/lib/local-blogs';
import { getPublicationData } from '@/lib/local-publication';

const RSS = () => null;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { res } = ctx;

	const publication = getPublicationData();
	const posts = await getAllPosts();
	const fullPostsPromises = posts.map((post) => getPostBySlug(post.slug));
	const fullPosts = (await Promise.all(fullPostsPromises)).filter(Boolean);

	const xml = constructRSSFeedFromPosts(
		publication,
		fullPosts,
		null,
		null,
	);

	res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
	res.setHeader('content-type', 'text/xml');
	res.write(xml);
	res.end();

	return { props: {} };
};

export default RSS;
