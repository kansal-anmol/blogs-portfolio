import { SOCIALS } from '@/src/client/constants/social';
import { USER } from '@/src/shared/constants/user';

export const AuthorCard = () => (
	<div className="mt-8 flex w-full flex-col items-center gap-6 rounded-xl border border-[#222222] bg-[#111111] p-6 text-center md:flex-row md:items-start md:text-left">
		<div className="h-[64px] w-[64px] shrink-0 overflow-hidden rounded-full border border-[#222222] bg-[#0a0a0a]">
			<img src="/assets/profile.jpg" alt={USER.name} className="h-full w-full object-cover" />
		</div>
		<div className="flex flex-grow flex-col gap-3">
			<div className="flex flex-col gap-0.5">
				<h4 className="font-heading text-md font-extrabold text-white">{USER.name}</h4>
				<p className="font-heading text-xs font-semibold tracking-wider text-[#b5f542] uppercase">
					{USER.role} @ {USER.company}
				</p>
			</div>
			<p className="font-body max-w-xl text-sm leading-relaxed text-neutral-400">{USER.bio}</p>

			{/* Social Icon Links */}
			<div className="mt-1 flex items-center gap-3">
				{SOCIALS.map(({ name, href, icon: Icon }) => (
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
		</div>
	</div>
);
