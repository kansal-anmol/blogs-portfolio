//icons
import { IoCalendarOutline } from "react-icons/io5";
import { GrScorecard } from "react-icons/gr";
import { HeadingDivider } from "../headingDivider";

export function EducationSection() {

	return (
		<section id="education" className="mt-16">
			<HeadingDivider title="Education" />

			<div className="pt-4 flex flex-col gap-3">
				<div
					tabIndex={0}
					className="text-lg font-light leading-relaxed"
				>
					<div className="flex flex-col gap-4">
						<div className="flex flex-row justify-between">
							<div className="flex flex-row gap-4">
								<div className="flex flex-col gap-4 justify-between">
									<div className="text-lg ">B.E. in Information Technology</div>
									<div className="text-md font-bold">
										Netaji Subhas Institute Of Technology, Delhi
									</div>
								</div>
							</div>
							<div className="hidden md:flex flex-col justify-between w-40">
								<div className="flex flex-row gap-2">
									<IoCalendarOutline size={32} />
									2017 - 2021
								</div>

								<div className="flex flex-row gap-2">
									<GrScorecard size={32} />
									9.14 CGPA
								</div>
							</div>
						</div>

						<div className="md:hidden flex flex-row justify-between">
							<div className="flex flex-row gap-1 md:hidden">
								<IoCalendarOutline size={32} />
								2017 - 2021
							</div>

							<div className="flex flex-row gap-1 md:hidden">
								<GrScorecard size={32} />
								9.14 CGPA
							</div>
						</div>

						{/* <div className="flex flex-row justify-between pt-8">
							<div className="flex flex-row gap-4">
								<div className="flex flex-col gap-4 justify-between">
									<div className="text-lg ">XII, CBSE Board, Non-Medical </div>
									<div className="text-md font-bold">Star Plus Convent School, Raman</div>
								</div>
							</div>
							<div className="hidden md:flex flex-col justify-between w-40">
								<div className="flex flex-row gap-2">
									<IoCalendarOutline size={24} />
									2017
								</div>

								<div className="flex flex-row gap-2">
									<GrScorecard size={24} />
									89.4 %age
								</div>
							</div>
						</div>

						<div className="md:hidden flex flex-row justify-between">
							<div className="flex flex-row gap-2">
								<IoCalendarOutline size={24} />
								2017
							</div>

							<div className="flex flex-row gap-2">
								<GrScorecard size={24} />
								89.4 %age
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</section>
	);
}
