//components
import { HeadingDivider } from "@/components/about/headingDivider";


import Image from "next/image";

//icons
import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";

const EXPERIENCES = [
	{
		id: "0",
		role: "Senior Member, Tech",
		time: "May, 2024 - Present",
		company: "D. E. Shaw India Private Limited",
		location: "Hyderabad, India",
		companyDescription:
			"The D. E. Shaw group is a global investment and technology development firm with more than $60 billion in investment capital as of January 1, 2024",
		responsibilities: [
			"Working as a part of the DJS Infra team focused on building scalable and robust web infrastructure supporting 200+ production web applications firm-wide.",
		],
		logo: "/assets/d_e_shaw_india_private_limited_logo.jpeg"
	},
	{
		id: "1",
		role: "Senior Product Engineer",
		time: "April, 2023 - May, 2024",
		company: "Sprinklr",
		location: "Gurugram, India",
		companyDescription:
			"Sprinklr is the world's first Modern Customer Experience Management (CXM) platform that helps brands make their customers happier",
		responsibilities: [
			"Maintained a single page application (SPA) having 30+ routes by working in collaboration with Backend Developers, Product Managers and Designers etc",
			"Languages and Tools - HTML, CSS, JavaScript, TypeScript, ReactJS, Next, Jest, Redux, Apollo GraphQL Client, Git etc",
			"Provided mentorship to two new team members, facilitating their successful onboarding and contributing to their professional development within the organization",
			"Top performer for major release of Distributed platform in Q2, Q3 and Q4 2023",
			"Added bulk actions support in the contacts' module of Distributed platform"
		],
		logo: "/assets/sprinklr_logo.jpeg"
	},
	{
		id: "2",
		role: "Product Engineer",
		time: "June, 2021 - March, 2023",
		company: "Sprinklr",
		location: "Gurugram, India",
		responsibilities: [
			"Reduced Docker Image Size by 30% (approximately 1.53 GB)",
			"Integrated Stack Exchange and Stack Overflow channels in Distributed platform",
			"Added Translate action for inbound, outbound, suggestion and universal case messages in Distributed platform",
			"Added react-virtualized components which resulted in achieving a smooth 60FPS scrolling experience for infinite lists",
			"Incorporated Sentry for real-time error tracking and performance monitoring in Production, ensuring proactive issue identification"
		],
		logo: "/assets/sprinklr_logo.jpeg"
	},
	{
		id: "3",
		role: "Product Engineering Intern",
		time: "May, 2020 - June, 2020",
		company: "Sprinklr",
		location: "Gurugram, India",
		logo: "/assets/sprinklr_logo.jpeg",
		responsibilities: [
			"Developed the Actions Config Builder tool to automate the generation of experience configs for message actions.",
			"This resulted in significantly reducing the workload for both developers and testers and streamlining the configuration process (approx 20%)"
		]
	}
];

export function ExperienceSection() {

	return (
		<section id="experience" className="mt-16">
			<HeadingDivider title="Experience" />
			<div className="pt-6 flex flex-col gap-3">
				<div
					tabIndex={0}
					className="flex flex-col gap-10 text-lg font-light leading-relaxed"

				>
					{EXPERIENCES.map((experience) => (
						<div key={experience.id} className="flex flex-col gap-4">
							<div className="flex flex-row justify-between">
								<div className="flex flex-row gap-4">
									<Image src={experience.logo} alt="Sprinklr Logo" width="68" height="60" />
									<div className="flex flex-col justify-start">
										<div className="text-lg font-bold">{experience.company}</div>
										<div className="text-md">{experience.role}</div>
									</div>
								</div>
								<div className="hidden md:flex flex-col gap-2 text-md justify-between">
									<div className="flex flex-row gap-2">
										<IoCalendarOutline size={32} />
										{experience.time}
									</div>
									<div className="flex flex-row gap-2">
										<IoLocationOutline size={32} />

										{experience.location}
									</div>
								</div>
							</div>

							<div className="flex flex-row gap-2 md:hidden">
								<IoCalendarOutline size={32} />
								{experience.time}
							</div>

							<div className="flex flex-row gap-2 md:hidden">
								<IoLocationOutline size={32} />

								{experience.location}
							</div>

							{experience.companyDescription ? (
								<div className="text-md font-extralight">{experience.companyDescription} </div>
							) : null}
							<ul className="pl-6 list-disc">
								{experience.responsibilities?.map((desc) => (
									<li key={desc} className="mb-1">
										{desc}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
