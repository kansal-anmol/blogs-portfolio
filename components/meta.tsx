import parse from 'html-react-parser';
import Head from 'next/head';
import { useAppContext } from './contexts/appContext';

export const Meta = () => {
	const { publication } = useAppContext();
	const { metaTags } = publication;

	return (
		<Head>
			<link rel="icon" type="image/jpeg" href="/assets/profile.jpg" />
			<link rel="apple-touch-icon" href="/assets/profile.jpg" />
			<meta name="theme-color" content="#000000" />
			{metaTags && parse(metaTags)}
		</Head>
	);
};
