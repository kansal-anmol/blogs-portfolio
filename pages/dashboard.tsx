import { GetServerSideProps } from 'next';
import { getPublicationData } from '../lib/local-publication';

const Dashboard = () => null;

export const getServerSideProps: GetServerSideProps = async () => {
	const publication = getPublicationData();

	return {
		redirect: {
			destination: `https://hashnode.com/${publication.id}/dashboard`,
			permanent: false,
		},
	};
};

export default Dashboard;
