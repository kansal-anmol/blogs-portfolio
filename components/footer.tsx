import { Container } from './container';
import { useAppContext } from './contexts/appContext';
import PostAuthorInfo from './post-author-info';
import { SocialLinks } from './social-links';
import { SubscribeForm } from './subscribe-form';

export const Footer = () => {
	const { publication } = useAppContext();

	return (
		<footer className="border-t py-20 dark:border-neutral-800 ">
			<Container className="px-5 flex flex-col lg:flex-row items-center justify-between gap-10">
				<div className="flex flex-col gap-10">
					<PostAuthorInfo
						author={{ ...publication.author, bio: { html: "<p>Web Development allows me to bring my ideas to life. </p>" } }}
					/>

					<div className="flex flex-col items-center lg:items-start gap-5 text-center text-slate-600 dark:text-neutral-300 md:text-left">
						<SocialLinks />
					</div>
				</div>

				<div className="col-span-full md:col-span-2 md:col-start-2">
					<h2 className="text-primary-600 dark:text-primary-500 mb-5 text-left text-md font-semibold">
						Subscribe to my newsletter to stay up to date with articles!
					</h2>
					<SubscribeForm />
				</div>

			</Container>
		</footer>
	);
};
