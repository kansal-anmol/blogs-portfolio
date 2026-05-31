import { NextApiRequest, NextApiResponse } from 'next';
import { getAllPosts } from '../../lib/local-blogs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const query = req.query.q ? (req.query.q as string).toLowerCase() : '';
	const posts = await getAllPosts();

	if (!query) {
		return res.status(200).json({ searchPostsOfPublication: { edges: [] } });
	}

	const filteredPosts = posts.filter(
		(post) =>
			post.title.toLowerCase().includes(query) ||
			post.brief.toLowerCase().includes(query) ||
			post.slug.toLowerCase().includes(query)
	);

	const edges = filteredPosts.map((post) => ({
		node: post,
	}));

	return res.status(200).json({
		searchPostsOfPublication: {
			edges,
		},
	});
}
