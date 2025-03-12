//components
import { HeadingDivider } from "@/components/about/headingDivider";

export function AchievementsSection() {
	return (
		<section id="achievements" className="mt-16">
			<HeadingDivider title="Achievements" />

			<div className="pt-4 pb-4 max-w-5xl flex flex-col gap-3">
				<div
					className="text-lg font-light leading-relaxed"
				>
					<div className="gap-12 pb-8">
						<ul className="pl-12 list-disc">
							<li className="mb-2">
								Secured an All India Rank of 3743 in JEE Mains 2017 out of 1.3 Million students.
							</li>
							<li className="mb-2">CodeForces Max Rating: 1742 (Expert) </li>
							<li className="mb-2">CodeChef Max Rating: 1890 (4 Star) </li>
							<li className="mb-2">Achieved 817 Global Rank in Google Kickstart Round B, 2020</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
