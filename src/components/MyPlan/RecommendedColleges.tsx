import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import CollegeCard from "../Card";
import { useMemo, useState } from "react";
import CarouselContainer from "./CarouselContainer";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ViewCarouselOutlinedIcon from "@mui/icons-material/ViewCarouselOutlined";
import KMan from "./SvgKMan";

const RecommendedColleges = ({
	colleges,
	handleFavoriteToggle,
}: {
	colleges: any[];
	handleFavoriteToggle: any;
}) => {
	const [gridView, setGridView] = useState(false);

	const cardLength = useMemo(() => colleges.length, [colleges]);

	return (
		<Box
			className='course-container'
			sx={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}
		>
			<Box
				className='college-card-title'
				sx={{
					backgroundColor: "#7C6FA8",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: "20px",
					color: "#FFFFFF",
					minHeight: "40px",
					paddingRight: cardLength > 3 ? "20px" : "",
				}}
			>
				<Box
					sx={{
						flex: 1,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						paddingLeft: cardLength > 3 ? "110px" : "",
						gap: "20px",
					}}
				>
					<KMan />
					<Typography
						variant='h6'
						sx={{ fontSize: "16px", fontWeight: "bold" }}
					>{`Recommended by KapAdvisor (${cardLength})`}</Typography>
				</Box>
				{cardLength > 3 && (
					<Box
						sx={{
							display: "flex",
							gap: "20px",
							justifyContent: "center",
							alignItems: "center",
							minWidth: "110px",
						}}
					>
						<Tooltip title='Grid View'>
							<IconButton
								size='small'
								onClick={() => setGridView(true)}
								sx={{ color: gridView ? "#fff" : "#1E0576" }}
							>
								<GridViewRoundedIcon fontSize='small' />
							</IconButton>
						</Tooltip>
						<Tooltip title='Carousel View'>
							<IconButton
								size='small'
								onClick={() => setGridView(false)}
								sx={{ color: !gridView ? "#fff" : "#1E0576" }}
							>
								<ViewCarouselOutlinedIcon />
							</IconButton>
						</Tooltip>
					</Box>
				)}
			</Box>
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
					noAddCard={true}
				/>
			)}
		</Box>
	);
};

export default RecommendedColleges;
