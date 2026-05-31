import { resizeImage } from '@/utils/image';
import { Post, Author } from '../lib/types';
import { CoverImage } from './cover-image';
import { DateFormatter } from './date-formatter';
import { ReadTimeInMinutes } from './post-read-time-in-minutes';
import { PostTitle } from './post-title';
import { useAppContext } from './contexts/appContext';
import ProfileImage from './profile-image';

type Props = {
	title: string;
	coverImage: string | null | undefined;
	date: string;
	author: Author;
	readTimeInMinutes: number;
};

export const PostHeader = ({ title, coverImage, date, author, readTimeInMinutes }: Props) => {
	const { publication } = useAppContext();
	const activeAuthor = author || publication.author;
	return (
		<>
			<PostTitle>{title}</PostTitle>
			<div className="flex flex-row flex-wrap items-center justify-center w-full gap-2 px-2 text-slate-700 dark:text-neutral-300 md:px-0">
				<div className="mb-5 flex w-full flex-row items-center justify-center md:mb-0 md:w-auto md:justify-start">
					<div
						className="overflow-hidden rounded-full bg-slate-200 dark:bg-white/20 md:mr-3 h-10 w-10 md:h-12 md:w-12"
					>
						<ProfileImage user={activeAuthor} width="200" height="200" hoverDisabled={true} />
					</div>
					<div className="ml-2 font-semibold text-slate-600 dark:text-white md:ml-0">
						<span>{activeAuthor.name}</span>
					</div>
				</div>
				<div className="mb-5 flex w-full flex-row items-center justify-center md:mb-0 md:w-auto md:justify-start">
					<span className="mx-3 hidden font-bold text-slate-500 md:block">&middot;</span>
					<DateFormatter dateString={date} />
					{readTimeInMinutes && <span className="mx-3 font-bold text-slate-500">&middot;</span>}
					<ReadTimeInMinutes readTimeInMinutes={readTimeInMinutes} />
				</div>
			</div>
			{coverImage && (
				<div className="w-full px-5 sm:mx-0">
					<CoverImage
						title={title}
						src={resizeImage(coverImage, { w: 1600, h: 840, c: 'thumb' })}
						priority={true}
					/>
				</div>
			)}
		</>
	);
};
