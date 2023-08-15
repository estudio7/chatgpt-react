// src/components/MyStats.tsx
import React, { useEffect, useState } from "react";
import { getInfoUser } from "../../services/auth";
import { UserData } from "../../types/types";
import { StatLine, Button } from "../Sidebar/styles";
import { Edit as EditIcon } from "@mui/icons-material";
import ProfileIcon from "../../svgs/ProfileStat";
import Box from "@mui/material/Box";

const Scores = ({ label, value }: { label: string; value: any }) => (
	<Box sx={{ display: "flex" }}>
		<StatLine sx={{ flex: "1" }}>{label}:</StatLine>
		<StatLine sx={{ flex: "1", fontWeight: "700" }}>{value || "N/A"}</StatLine>
	</Box>
);

const MyStats = () => {
	const [userData, setUserData] = useState<UserData | null>(null);
	const [showEditIcon, setShowEditIcon] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getInfoUser();
			setUserData(data);
		};
		fetchData();
	}, []);

	if (!userData) {
		return <div>Loading...</div>;
	}

	return (
		<Box sx={{ backgroundColor: "#ffffff", textAlign: "center" }}>
			<ProfileIcon />
			<h5 style={{ color: "#190755" }}>
				My Stats {showEditIcon && <EditIcon />}
				<button onClick={() => setShowEditIcon(!showEditIcon)}></button>
			</h5>
			<Scores
				label={"GPA"}
				value={
					!userData.gpa_score || userData.gpa_score == "-1"
						? "N/A"
						: userData.gpa_score
				}
			/>
			<Scores
				label={"SAT"}
				value={
					!userData.sat_score || userData.sat_score == "-1"
						? "N/A"
						: userData.sat_score
				}
			/>
			<Scores
				label={"ACT"}
				value={
					!userData.act_score || userData.act_score == "-1"
						? "N/A"
						: userData.act_score
				}
			/>

			<div>
				<Button bgcolor='#2B8623'>Excelling</Button>
				<Button bgcolor='#C1D82F' style={{ color: "#190755" }}>
					On Target
				</Button>
				<Button bgcolor='#FFA826' style={{ color: "#190755" }}>
					Needs Work
				</Button>
			</div>
		</Box>
	);
};

export default MyStats;
