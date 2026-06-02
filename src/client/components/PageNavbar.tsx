import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const PageNavbar = () => {
	const router = useRouter();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Blog', href: '/blogs' },
		{ name: 'Terminal', href: '/terminal' },
	];

	const isActive = (href: string) => {
		if (href === '/') {
			return router.pathname === '/';
		}
		return router.pathname.startsWith(href);
	};

	return (
		<nav className="sticky top-0 z-50 border-b border-[#222222] bg-[#0a0a0a]/80 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
				{/* Logo / Monogram */}
				<Link href="/" className="group flex items-center gap-2">
					<div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-[#222222] transition-all duration-300 group-hover:border-[#b5f542] group-hover:shadow-[0_0_10px_rgba(181,245,66,0.15)]">
						<img
							src="/assets/profile.png"
							alt="Profile Picture"
							className="h-full w-full object-cover"
						/>
					</div>
				</Link>

				{/* Desktop Nav Links */}
				<div className="hidden items-center gap-8 md:flex">
					{navLinks.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							className={`font-heading text-sm font-medium transition-colors ${
								isActive(link.href)
									? 'font-semibold text-[#b5f542]'
									: 'text-neutral-400 hover:text-[#b5f542]'
							}`}
						>
							{link.name}
						</Link>
					))}
				</div>

				{/* Mobile Hamburger Button */}
				<button
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					className="p-2 text-neutral-400 hover:text-[#b5f542] focus:outline-none md:hidden"
					aria-label="Toggle Menu"
				>
					{isMobileMenuOpen ? (
						<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					) : (
						<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					)}
				</button>
			</div>

			{/* Mobile Nav Menu */}
			{isMobileMenuOpen && (
				<div className="flex flex-col gap-4 border-b border-[#222222] bg-[#0a0a0a] px-6 py-4 md:hidden">
					{navLinks.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							onClick={() => setIsMobileMenuOpen(false)}
							className={`font-heading py-1 text-sm font-medium transition-colors ${
								isActive(link.href)
									? 'font-semibold text-[#b5f542]'
									: 'text-neutral-400 hover:text-[#b5f542]'
							}`}
						>
							{link.name}
						</Link>
					))}
				</div>
			)}
		</nav>
	);
};
export default PageNavbar;
