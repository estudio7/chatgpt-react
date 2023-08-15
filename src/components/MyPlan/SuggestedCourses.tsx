import { Box, Chip, List, Typography } from "@mui/material";
import { fetchWithToken } from "../../utils/fetchWithToken";
import KIcon from "./SvgK";
import { useEffect, useState } from "react";

type CourseData = {
	category: null | string;
	id: number;
	link: string;
	name: string;
	url: string;
};

const SuggestedCourses = () => {
	const [courses, setCourses] = useState<CourseData[]>([]);
	useEffect(() => {
		const readSuggestedCourses = async () => {
			try {
				const recommendedCourses = await fetchWithToken(
					`${process.env.NEXT_PUBLIC_API_URL}get_courses`
				)
					.then((response) => {
						if (!response || !response.ok) {
							console.error(`HTTP error! status: ${response?.status}`);
							return;
						}
						return response.text();
					})
					.then((responseData: any) => {
						const data = JSON.parse(responseData);
						if (data && data.courses) {
							return Object.values(data.courses) as CourseData[];
						}
						return [];
					})
					.catch((error) => {
						console.error("Error occurred while fetching data: ", error);
						throw error;
					});

				setCourses(recommendedCourses);
			} catch (error) {
				console.error("Error occurred while fetching data: ", error);
			}
		};
		readSuggestedCourses();
	}, []);

	return (
		<Box className='course-container'>
			<Box
				className='course-title'
				sx={{
					backgroundColor: "#1E0576",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: "20px",
					color: "#FFFFFF",
					minHeight: "40px",
				}}
			>
				<KIcon />
				<Typography variant='subtitle2'>
					Kaplan Recommended Courses({courses.length})
				</Typography>
			</Box>
			<Box
				className='course-main'
				sx={{
					marginTop: "20px",
					marginBottom: "50px",
					display: "flex",
					flexWrap: "wrap",
					gap: "20px",
				}}
			>
				{courses.map((cs) => (
					<Chip
						key={cs.url}
						label={cs.name}
						component='a'
						href={cs.url}
						variant='outlined'
						clickable
						target='_blank'
					/>
				))}
			</Box>
		</Box>
	);
};

export default SuggestedCourses;
