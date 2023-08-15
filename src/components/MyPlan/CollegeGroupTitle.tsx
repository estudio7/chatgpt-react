import React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ViewCarouselOutlinedIcon from "@mui/icons-material/ViewCarouselOutlined";

type CollegeCardTitleProps = {
	cardLength: number;
	gridView: boolean;
	setGridView: (value: boolean) => void;
	title: string;
	Icon?: any;
	sx?: any;
};

const CollegeGroupTitle: React.FC<CollegeCardTitleProps> = ({
	cardLength,
	gridView,
	setGridView,
	title,
	Icon,
	sx,
}) => (
	<Box
		className='college-card-title'
		sx={{
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			gap: "20px",
			minHeight: "40px",
			paddingRight: cardLength > 3 ? "20px" : "",
			border: "1px solid #ddd",
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
			{Icon && <Icon />}
			<Typography
				variant='h6'
				sx={{ fontSize: "16px", fontWeight: "bold" }}
			>{`${title} (${cardLength})`}</Typography>
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
						sx={{
							color: gridView ? "#1E0576" : "rgb(0 0 0 / 48%)",
						}}
					>
						<GridViewRoundedIcon fontSize='small' />
					</IconButton>
				</Tooltip>
				<Tooltip title='Carousel View'>
					<IconButton
						size='small'
						onClick={() => setGridView(false)}
						sx={{
							color: gridView ? "rgb(0 0 0 / 48%)" : "#1E0576",
						}}
					>
						<ViewCarouselOutlinedIcon />
					</IconButton>
				</Tooltip>
			</Box>
		)}
	</Box>
);

export default CollegeGroupTitle;
