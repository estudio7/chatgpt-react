import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CollegeCard from "../Card";

const YELLOW = "#FFA826";
const LIGHT_GREEN = "#C1D82F";
const DARK_GREEN = "#287D21";

const getFlagColor = (university_score: any, student_score: any) => {
	const x1 = 0.9 * university_score;
	const x2 = 1.1 * university_score;
	if (Number(student_score) < x1) {
		return YELLOW;
	} else if (Number(student_score) > x2) {
		return DARK_GREEN;
	} else {
		return LIGHT_GREEN;
	}
};

const CollegeCardList = ({
	allColleges,
	page,
	pageSize,
	userData,
	handleFavoriteToggle,
	inFavorites,
}: {
	allColleges: any[];
	page: number;
	pageSize: number;
	userData: any;
	handleFavoriteToggle: any;
	inFavorites: any;
}) => {
	return (
		<Grid
			className='styled-grid'
			container
			spacing={3}
			width='100%'
			sx={{ marginTop: "10px" }}
		>
			{allColleges
				.slice((page - 1) * pageSize, page * pageSize)
				.map((universityData, index) => {
					const ACT_flag_color = getFlagColor(
						universityData["ACT Score"],
						userData?.act_score
					);
					const GPA_flag_color = getFlagColor(
						universityData["GPA Score"],
						userData?.gpa_score
					);
					const SAT_flag_color = getFlagColor(
						universityData["SAT Score"],
						userData?.sat_score
					);
					return (
						<Grid item key={index} xs={12} sm={6} md={6} lg={4}>
							<CollegeCard
								data={{
									...universityData,
									is_favorite:
										universityData.is_favorite !== undefined
											? universityData.is_favorite
											: inFavorites(universityData)?.is_favorite,
									ACT_flag_color,
									GPA_flag_color,
									SAT_flag_color,
								}}
								onFavoriteToggle={handleFavoriteToggle}
								source='searchColleges'
							/>
						</Grid>
					);
				})}
		</Grid>
	);
};

export default CollegeCardList;
