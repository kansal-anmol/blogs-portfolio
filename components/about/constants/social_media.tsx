import { BsFillEnvelopeOpenFill, BsGithub, BsLinkedin } from 'react-icons/bs';
import { SiHashnode } from 'react-icons/si';

export const SOCIAL_MEDIA = [
	{
		id: 'linkedin',
		icon: <BsLinkedin />,
		title: 'Visit LinkedIn profile',
		url: 'https://www.linkedin.com/in/kansal-anmol',
	},
	{
		id: 'github',
		icon: <BsGithub />,
		title: 'Visit Github profile',
		url: 'https://github.com/kansal-anmol',
	},
	{
		id: 'hashnode',
		icon: <SiHashnode />,
		title: 'Send me an email',
		url: 'https://hashnode.com/@kansalanmol0609',
	},
	{
		id: 'mail',
		icon: <BsFillEnvelopeOpenFill />,
		title: 'Send me an email',
		url: 'mailto://kansalanmol0609@gmail.com',
	},
];
