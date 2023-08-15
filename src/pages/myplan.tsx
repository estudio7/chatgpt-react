import React, { useState, useEffect, useCallback } from "react";
import { fetchWithToken } from "../utils/fetchWithToken";
import LinearBuffer from "../components/LinearBuffer";
import { Grid, Box, Typography, AppBar, Toolbar, Link } from "@mui/material";
import { NextPage } from "next";
import { getOnboardingStatus, getSuggestedColleges } from "../services/auth";
import { CollegeData } from "../types/types";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import MyPlanIcon from "../svgs/MyPlanLarge";
import SuggestedCourses from "../components/MyPlan/SuggestedCourses";
import RecommendedColleges from "../components/MyPlan/RecommendedColleges";
import ReachColleges from "../components/MyPlan/CollegeCardView";
import OnBoardingInProgressMessage from "../components/OnBoardingInProgressMessage";
import dynamic from "next/dynamic";

const Myplan: NextPage = () => {
	const [onboardingStatus, setOnboardingStatus] = useState("");
	const [suggestions, setSuggestions] = useState<CollegeData[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		try {
			const allData = await getSuggestedColleges();
			console.log({ allData });
			if (allData) {
				setSuggestions(allData);
			}
		} finally {
			setIsLoading(false);
		}
	}, [setSuggestions]);

	const refreshData = useCallback(async () => {
		try {
			const allData = await getSuggestedColleges();
			if (allData) {
				setSuggestions(allData);
			}
		} catch (error) {
			console.error("Error occurred while fetching data: ", error);
		}
	}, [setSuggestions]);

	useEffect(() => {
		try {
			fetchData();
		} catch (error) {
			console.error("Error occurred while fetching data: ", error);
		}
	}, [fetchData]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getOnboardingStatus();
				setOnboardingStatus(data);
			} catch (e) {
				console.log(e);
			}
		};
		fetchData();
	}, []);

	const handleFavoriteToggle = useCallback(() => {
		refreshData();
	}, [refreshData]);

	const filteredSuggestionsForAccordion = useCallback(
		(type: string) =>
			suggestions.filter(
				(item) =>
					item["Acceptance probability"] === type && item["is_favorite"] === 1
			),
		[suggestions]
	);

	if (!isLoading && !onboardingStatus) {
		return (
			<NavBar>
				<OnBoardingInProgressMessage />
			</NavBar>
		);
	}
	if (
		!isLoading &&
		onboardingStatus.length &&
		onboardingStatus[1] !== "complete"
	) {
		return (
			<NavBar>
				<OnBoardingInProgressMessage />
			</NavBar>
		);
	}

	return (
		<NavBar>
			{isLoading ? (
				<LinearBuffer />
			) : suggestions.length === 0 ||
			  (onboardingStatus && onboardingStatus[1] !== "complete") ? (
				<OnBoardingInProgressMessage />
			) : (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "start",
						alignItems: "stretch",
					}}
				>
					<Box display='flex' justifyContent='center'>
						<Grid className='styled-grid' container justifyContent='center'>
							<Grid
								item
								xs={12}
								lg={10}
								sx={{
									paddingRight: "32px",
									paddingTop: "50px",
									paddingLeft: "32px !important",
								}}
							>
								<Box sx={{ display: "flex", justifyContent: "space-between" }}>
									<Typography
										sx={{
											fontSize: "32px",
											fontWeight: "bold",
											color: "#190755",
										}}
									>
										You’ve got a Plan!
									</Typography>
									<MyPlanIcon />
								</Box>
								<Typography
									sx={{
										fontSize: "20px",
										fontWeight: "bold",
										color: "#190755",
										margin: "10px 0 30px",
									}}
								>
									My College List
								</Typography>
								{/* Safety */}
								<ReachColleges
									handleFavoriteToggle={handleFavoriteToggle}
									colleges={filteredSuggestionsForAccordion("Safety")}
									title={"Safety"}
								/>
								{/* Target */}
								<ReachColleges
									handleFavoriteToggle={handleFavoriteToggle}
									colleges={filteredSuggestionsForAccordion("Target")}
									title={"Target"}
								/>
								{/* Reach */}
								<ReachColleges
									handleFavoriteToggle={handleFavoriteToggle}
									colleges={filteredSuggestionsForAccordion("Reach")}
									title={"Reach"}
								/>
								{/* <RecommendedColleges
									handleFavoriteToggle={handleFavoriteToggle}
									colleges={suggestions.filter(
										(item) => item["is_favorite"] === 0
									)}
								/> */}
								<SuggestedCourses />
							</Grid>
							<Grid item xs={12} lg={2}>
								<div className='sidebar-container'>
									<Sidebar />
								</div>
							</Grid>
						</Grid>
					</Box>
				</Box>
			)}
		</NavBar>
	);
};

export default dynamic(() => Promise.resolve(Myplan), { ssr: false });
