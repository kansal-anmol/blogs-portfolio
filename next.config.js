/**
 * @type {import('next').NextConfig}
 */
const config = {
	experimental: {
		scrollRestoration: true,
	},
	images: {
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
