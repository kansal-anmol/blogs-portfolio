import { Container } from './container';
import { useAppContext } from './contexts/appContext';
import PostAuthorInfo from './post-author-info';
import { SocialLinks } from './social-links';

export const Footer = () => {
	const { publication } = useAppContext();

	return (
		<footer className="border-t py-20 dark:border-neutral-800 ">
			<Container className="px-5 flex flex-col lg:flex-row items-center justify-between gap-10">
				<div className="flex flex-col gap-10">
					<PostAuthorInfo
						author={{ ...publication.author, bio: { html: "<p>Web Development allows me to bring my ideas to life. </p>" } }}
					/>
				</div>

				<div className="flex flex-col items-center lg:items-end gap-5 text-center text-slate-600 dark:text-neutral-300 md:text-right">
					<SocialLinks />
				</div>

			</Container>
		</footer>
	);
};
