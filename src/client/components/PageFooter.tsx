import { SOCIAL_ICONS } from '@/src/client/constants/social';
import type { UserSocial } from '@/src/shared/types';

interface PageFooterProps {
	authorName: string;
	socials: UserSocial[];
}

export const PageFooter = ({ authorName, socials }: PageFooterProps) => {
	const activeSocials = (socials || [])
		.filter((s) => SOCIAL_ICONS[s.name])
		.map((s) => ({ name: s.name, href: s.url, icon: SOCIAL_ICONS[s.name] }));

	return (
		<footer className="border-t border-[#222222] bg-[#0a0a0a] py-12">
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 px-6">
				<div className="flex items-center gap-4">
					{activeSocials.map(({ name, href, icon: Icon }) => (
						<a
							key={name}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Visit my ${name}`}
							className="text-neutral-500 transition-colors duration-300 hover:text-[#b5f542]"
						>
							<Icon className="h-5 w-5" />
						</a>
					))}
				</div>
				<p className="font-heading text-sm font-medium text-neutral-500">
					© {new Date().getFullYear()} {authorName}
				</p>
			</div>
		</footer>
	);
};
export default PageFooter;
