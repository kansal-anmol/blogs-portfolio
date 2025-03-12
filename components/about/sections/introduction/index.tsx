import { useEffect, useState, } from "react";

const TEXT = [
	"build interactive UI using React",
	"develop websites using Next.js",
	"like to solve challenging problems",
];

export function WelcomeSection() {
	let [count, setCount] = useState(0);


	useEffect(() => {
		let interval = setInterval(() => {
			setCount(count + 1);

			if (count === 2) {
				setCount(0);
			}
		}, 2000);

		return () => clearInterval(interval);
	}, [count]);

	return (
		<section id="intro" className="section" >
			<div className="pt-5 pb-8 md:pt-10">
				<h1
					className="text-3xl md:text-5xl xl:text-6xl font-bold"
				>
					Hi, I&apos;m <mark className="bg-transparent text-blue-light">Anmol Kansal</mark>, a <mark className="bg-transparent text-blue-light">passionate</mark> software
					developer.
				</h1>

				<div className="mt-3 relative flex flex-col overflow-hidden">
					<p
						className="text-[17px] md:text-2xl transform-none opacity-100"
					>
						I
						<span
							className="absolute flex flex-col transition-all duration-500 ease-in-expo"
							style={{
								top:
									count === 0
										? "0"
										: count === 1
											? "-100%"
											: count === 2
												? "-200%"
												: count === 3
													? "-300%"
													: "0",
								left: "13px",
							}}
						>
							{TEXT.map((element) => (
								<TextElement key={element} element={element} />
							))}
						</span>
					</p>
				</div>
			</div>
		</section>
	);
}

function TextElement({ element }: { element: string }) {
	const firstWord = <b>{element.split(" ").at(0)}</b>;
	const restWords = element.split(" ").slice(1).join(" ");

	return (
		<span
			className="text-[17px] md:text-2xl"
		>
			{firstWord} {restWords}
		</span>
	);
}
