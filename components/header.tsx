import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { PublicationNavbarItem, PublicationNavigationType } from '../generated/graphql';
import { Button } from './button';
import { Container } from './container';
import HamburgerSVG from './icons/svgs/HamburgerSVG';
import { PublicationLogo } from './publication-logo';
import PublicationSidebar from './sidebar';
import { useDarkMode } from './contexts/darkModeContext';
import { MoonSVG, SunSVG } from './icons';
import Link from 'next/link';

const navbarItems: (PublicationNavbarItem & { url: string; })[] = [
	{ label: 'Home', url: '/', id: 'home', type: PublicationNavigationType.Page },
	{ id: 'about', label: 'About', url: '/about', type: PublicationNavigationType.Page },
];

export const Header = () => {
	const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>();
	const visibleItems = navbarItems.slice(0, 3);
	const hiddenItems = navbarItems.slice(3);
	const { isDarkMode, toggleDarkMode } = useDarkMode();

	const toggleSidebar = () => {
		setIsSidebarVisible((prevVisibility) => !prevVisibility);
	};

	const navList = (
		<ul className="flex flex-row items-center gap-2 text-white">
			{visibleItems.map((item) => (

				<li key={item.url}>
					<Link
						href={item.url}
						// target="_blank"
						rel="noopener noreferrer"
						className="transition-200 block max-w-[200px] truncate text-ellipsis whitespace-nowrap rounded-full p-2 transition-colors hover:bg-white hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
					>
						{item.label}
					</Link>
				</li>
			))}

			{hiddenItems.length > 0 && (
				<li>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild>
							<button className="transition-200 block rounded-full p-2 transition-colors hover:bg-white hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white">
								More
							</button>
						</DropdownMenu.Trigger>

						<DropdownMenu.Portal>
							<DropdownMenu.Content
								className="w-48 rounded border border-gray-300 bg-white text-neutral-950 shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
								align="end"
								sideOffset={5}
							>
								{hiddenItems.map((item) => (
									<DropdownMenu.Item asChild key={item.url}>
										<Link
											href={item.url}
											target="_blank"
											rel="noopener noreferrer"
											className="transition-200 block truncate p-2 transition-colors hover:bg-slate-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
										>
											{item.label}
										</Link>
									</DropdownMenu.Item>
								))}
							</DropdownMenu.Content>
						</DropdownMenu.Portal>
					</DropdownMenu.Root>
				</li>
			)}
		</ul>
	);

	return (
		<header className="border-b bg-slate-950 py-10 dark:border-neutral-800 dark:bg-neutral-900">
			<Container className="grid grid-cols-4 gap-5 px-5">
				<div className="col-span-3 flex flex-1 flex-row items-center gap-2 lg:col-span-1">
					<div className="grid grid-cols-3 gap-5 items-center lg:hidden w-full" >
						<div className="col-span-1">
							<Button
								type="outline"
								label=""
								icon={<HamburgerSVG className="h-5 w-5 stroke-current" />}
								className="w-auto rounded-xl border-transparent !px-3 !py-2 text-white hover:bg-slate-900 dark:hover:bg-neutral-800"
								onClick={toggleSidebar}
							/>
						</div>

						<div className="col-span-2 flex justify-center lg:hidden">
							<PublicationLogo />
						</div>

						{isSidebarVisible && (
							<PublicationSidebar navbarItems={navbarItems} toggleSidebar={toggleSidebar} />
						)}
					</div>
					<div className="hidden lg:block">
						<PublicationLogo />
					</div>
				</div>
				<div className="col-span-1 flex flex-row items-center justify-end gap-5 text-slate-300  lg:col-span-3">
					<nav className="hidden lg:block">{navList}</nav>

					<button
						title='Switch theme'
						onClick={toggleDarkMode}
						className="flex items-center justify-center transition-colors duration-100 text-slate-300 focus-visible:outline-none hover:bg-slate-800 dark:hover:bg-slate-800 focus-visible:bg-slate-100 dark:focus-visible:bg-slate-800 disabled:text-slate-300 disabled:dark:text-slate-800 disabled:hover:bg-transparent disabled:dark:hover:bg-transparent disabled:cursor-not-allowed rounded-full p-2"
						aria-label="Switch theme"
					>
						{isDarkMode ? <SunSVG className="h-5 w-5 stroke-current" /> : <MoonSVG className="h-5 w-5 stroke-current" />}
					</button>
				</div>
			</Container>

		</header>
	);
};
