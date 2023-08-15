import { Box, Grid } from "@mui/material";
import CollegeCard from "../Card";
import { useMemo, useState } from "react";
import CarouselContainer from "./CarouselContainer";
import CollegeGroupTitle from "./CollegeGroupTitle";

const ReachColleges = ({
	colleges,
	handleFavoriteToggle,
	title,
}: {
	colleges: any[];
	handleFavoriteToggle: any;
	title: string;
}) => {
	const [gridView, setGridView] = useState(false);

	const cardLength = useMemo(() => colleges.length, [colleges]);

	return (
		<Box
			className='course-container'
			sx={{ display: "flex", flexDirection: "column" }}
		>
			<CollegeGroupTitle
				cardLength={cardLength}
				gridView={gridView}
				setGridView={setGridView}
				title={title}
			/>
			{gridView ? (
				<Grid container spacing={3} width='100%' sx={{ paddingTop: "20px" }}>
					{colleges.map((collegeData, index) => (
						<Grid item xs={12} sm={6} md={6} lg={4} key={index}>
							<CollegeCard
								data={collegeData}
								onFavoriteToggle={handleFavoriteToggle}
								source='myplan'
							/>
						</Grid>
					))}
				</Grid>
			) : (
				<CarouselContainer
					cardLength={cardLength}
					colleges={colleges}
					handleFavoriteToggle={handleFavoriteToggle}
				/>
			)}
		</Box>
	);
};

export default ReachColleges;
