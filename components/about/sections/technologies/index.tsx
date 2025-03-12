import { HeadingDivider } from "@/components/about/headingDivider";
import { TECHNOLOGIES } from "../../constants";

export function TechnologiesSection() {

	return (

		<section id="tech" className="section mt-16">
			<HeadingDivider title="Skills" />

			<p className="my-5 text-lg">
				I work with the following technologies and tools:
			</p>

			{!!TECHNOLOGIES.length && (
				<div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
					{TECHNOLOGIES.map((tech, index) => {
						return (
							<div
								key={tech.category}
								className="flex flex-col gap-4 flex-1 md:flex-auto"
							>
								<h3 className="text-lg font-bold">
									{tech.category}
								</h3>
								<div className="flex items-center flex-wrap gap-x-4 gap-y-4">
									{tech.items.map((item) => (
										<div key={item.name} className="group relative flex">
											<span role="img">
												{item.icon}
											</span>
											<span
												className="group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity bg-gray-800 text-sm text-gray-100 rounded-md absolute left-1/2
    -translate-x-1/2 translate-y-full opacity-0 mt-3 mx-auto px-2 w-max"
											>
												{item.name}
											</span>
										</div>
									))}
								</div>
							</div>
						);
					})}
				</div>
			)}
		</section>
	);
}
