/**
 * @type {import('next').NextConfig}
 */
const config = {
	experimental: {
		scrollRestoration: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.hashnode.com',
			},
		],
		unoptimized: true,
	},
	async rewrites() {
		return [];
	},
	async redirects() {
		return [];
	},
};

module.exports = config;