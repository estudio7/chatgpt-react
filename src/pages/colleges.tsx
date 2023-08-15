import React from "react";
import { Grid, Container, Box } from "@mui/material";
import type { NextPage } from "next";
import Pagination from "../components/Pagination";
import styles from "../styles/Main.module.css";
import NavBar from "../components/NavBar";
import LinearBuffer from "../components/LinearBuffer";
import { FilterPanel } from "../components/College/FilterPanel";
import SearchBar from "../components/College/SearchBar";
import CollegeCardList from "../components/College/CollegeCardList";
import OnBoardingInProgressMessage from "../components/OnBoardingInProgressMessage";
import useCollegeState from "../components/College/useCollegeState";

const PAGE_SIZE = 30;

const Colleges: NextPage = () => {
	const {
		onboardingStatus,
		universities,
		allColleges,
		page,
		isLoading,
		appliedFilter,
		userData,
		suggestedColleges,
		maxTuitionFees,
		handleFavoriteToggle,
		handleChange,
		setFilter,
	} = useCollegeState();
	const inFavorites = (col: any) =>
		suggestedColleges.find((d) => d.university_id === col.index);

	return (
		<NavBar>
			{isLoading ? (
				<LinearBuffer />
			) : universities.length === 0 ||
			  suggestedColleges.length === 0 ||
			  (onboardingStatus && onboardingStatus[1] !== "complete") ? (
				<OnBoardingInProgressMessage />
			) : (
				<Container className='styled-container' maxWidth={false}>
					<Box style={{ paddingTop: 20, color: "#190755" }}>
						<h2 className={styles.styledH2}>Search Colleges</h2>
					</Box>
					<Box
						display='flex'
						justifyContent='center'
						sx={{ marginTop: "10px" }}
					>
						<Grid
							className='styled-grid'
							container
							spacing={4}
							justifyContent='center'
						>
							<Grid item xs={12} md={4} lg={2}>
								<FilterPanel
									setFilter={setFilter}
									appliedFilter={appliedFilter}
									maxTuitionFees={maxTuitionFees}
								/>
							</Grid>
							<Grid item xs={12} md={8} lg={10}>
								<SearchBar
									setFilter={setFilter}
									appliedFilter={appliedFilter}
								/>
								<CollegeCardList
									allColleges={allColleges}
									page={page}
									pageSize={PAGE_SIZE}
									userData={userData}
									inFavorites={inFavorites}
									handleFavoriteToggle={handleFavoriteToggle}
								/>
								<Pagination
									count={Math.ceil(allColleges.length / PAGE_SIZE)}
									page={page}
									onChange={handleChange}
								/>
							</Grid>
						</Grid>
					</Box>
				</Container>
			)}
		</NavBar>
	);
};

export default Colleges;
