import type { IconType } from 'react-icons';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SiHashnode } from 'react-icons/si';

import { USER } from '@/src/shared/constants/user';

/** Maps social platform names (as stored in USER.socials) to their react-icons component. */
export const SOCIAL_ICONS: Record<string, IconType> = {
	GitHub: FaGithub,
	LinkedIn: FaLinkedinIn,
	Hashnode: SiHashnode,
};

/** Ready-to-use list of socials enriched with their icon component. */
export const SOCIALS = USER.socials
	.filter((s) => SOCIAL_ICONS[s.name])
	.map((s) => ({ name: s.name, href: s.url, icon: SOCIAL_ICONS[s.name] }));
