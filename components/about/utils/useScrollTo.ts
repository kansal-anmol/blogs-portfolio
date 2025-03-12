import { SyntheticEvent, useEffect, useState } from "react";

const navigationHeight = 80;

export function useScrollTo() {
	const [height, setHeight] = useState(navigationHeight);

	useEffect(() => {
		const handleResize = () => {
			if (window.matchMedia("(max-width: 480px)")) {
				setHeight(56);
			} else {
				setHeight(navigationHeight);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const scrollToEl = (e: SyntheticEvent) => {
		e.preventDefault();
		const hash = (e.target as HTMLAnchorElement).hash as string;
		const offsetTop = (document?.querySelector(hash) as HTMLAnchorElement)?.offsetTop - height;

		scroll({
			top: offsetTop,
			behavior: "smooth"
		});
	};

	return { scrollToEl };
}
