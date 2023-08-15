import { Box, Typography } from "@mui/material";
import React from "react";

const LegendSection: React.FC = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: "15px",
				marginTop: "60px",
			}}
		>
			<Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
				<Box
					sx={{
						width: "15px",
						height: "15px",
						borderRadius: "50%",
						backgroundColor: "#2B8623",
					}}
				></Box>
				<Typography variant='subtitle2' sx={{ fontSize: "12px" }}>
					Excelling
				</Typography>
			</Box>
			<Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
				<Box
					sx={{
						width: "15px",
						height: "15px",
						borderRadius: "50%",
						backgroundColor: "#C1D82F",
					}}
				></Box>
				<Typography
					variant='subtitle2'
					sx={{ color: "#190755", fontSize: "12px" }}
				>
					On Target
				</Typography>
			</Box>
			<Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
				<Box
					sx={{
						width: "15px",
						height: "15px",
						borderRadius: "50%",
						backgroundColor: "#FFA826",
					}}
				></Box>
				<Typography
					variant='subtitle2'
					sx={{ color: "#190755", fontSize: "12px" }}
				>
					Needs Work
				</Typography>
			</Box>
		</Box>
	);
};

export default LegendSection;
