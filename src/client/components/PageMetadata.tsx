import { HOST_NAME } from '@/src/shared/constants';
import type { User } from '@/src/shared/types';
import Head from 'next/head';

interface PageMetadataProps {
	user: User;
	title?: string;
	description?: string;
	urlPath?: string;
	ogType?: 'website' | 'profile' | 'article';
	ogImage?: string;
	noIndex?: boolean;
}

export const PageMetadata = ({
	user,
	title,
	description,
	urlPath = '',
	ogType = 'website',
	ogImage = '/assets/profile.png',
	noIndex = false,
}: PageMetadataProps) => {
	const defaultTitle = `${user.name} | ${user.role}`;
	const defaultDescription = `${user.role}. ${user.shortIntro}`;

	const displayTitle = title ? `${title} — ${user.name}` : defaultTitle;
	const displayDescription = description || defaultDescription;
	const canonicalUrl = `${HOST_NAME}/${urlPath}`;

	return (
		<Head>
			{/* Primary Metadata */}
			<title>{displayTitle}</title>
			<meta name="description" content={displayDescription} />
			<link rel="canonical" href={canonicalUrl} />

			{/* Robots */}
			{noIndex ? (
				<meta name="robots" content="noindex, nofollow" />
			) : (
				<meta name="robots" content="index, follow" />
			)}

			{/* Open Graph / Facebook */}
			<meta property="og:type" content={ogType} />
			<meta property="og:url" content={canonicalUrl} />
			<meta property="og:title" content={displayTitle} />
			<meta property="og:description" content={displayDescription} />
			<meta property="og:image" content={ogImage} />

			{/* Twitter */}
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={canonicalUrl} />
			<meta property="twitter:title" content={displayTitle} />
			<meta property="twitter:description" content={displayDescription} />
			<meta property="twitter:image" content={ogImage} />
		</Head>
	);
};
