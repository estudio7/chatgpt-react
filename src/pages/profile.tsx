import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router"; // Importing useRouter from next
import { fetchWithToken } from "../utils/fetchWithToken";
import LinearBuffer from "../components/LinearBuffer";
import {
	Grid,
	Container,
	Typography,
	TextField,
	Box,
	IconButton,
} from "@mui/material";
import { NextPage } from "next";
import NavBar from "../components/NavBar";
import StyledButton, {
	divStyle,
	boxStyle,
	typographyStyle,
	headerStyle,
	titleStyle,
} from "../components/Myprofile";
import { getToken } from "../services/auth";
import CheckIcon from "@mui/icons-material/Check";

interface FormData {
	[key: string]: string;
	latestGPA: string;
	latestACT: string;
	latestSAT: string;
	colleges: string;
	apClasses: string;
	ap_classes_list: string;
	extracurriculars: string;
	interestedIndustries: string;
	financialContribution: string;
}

const Profile: NextPage = () => {
	const router = useRouter(); // Initializing the router
	const token = getToken();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		latestGPA: "",
		latestACT: "",
		latestSAT: "",
		colleges: "",
		apClasses: "",
		ap_classes_list: "",
		extracurriculars: "",
		interestedIndustries: "",
		financialContribution: "",
	});

	const removeItem = (fieldName: string, index: number) => {
		if (formData[fieldName as keyof FormData]) {
			const fieldData = formData[fieldName as keyof FormData]
				.split(",")
				.map((item: string) => item.trim());
			fieldData.splice(index, 1);
			setFormData({
				...formData,
				[fieldName]: fieldData.join(", "),
			});
		} else {
			console.log(`${fieldName} is undefined`);
		}
	};

	const getUserData = useCallback(async () => {
		try {
			setIsLoading(true);
			const response = await fetchWithToken(
				`${process.env.NEXT_PUBLIC_API_URL}getUserInfo`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const data = await response?.json();
			setFormData({
				latestGPA: data.gpa_score !== null ? data.gpa_score.toString() : "",
				latestACT: data.act_score !== null ? data.act_score.toString() : "",
				latestSAT: data.sat_score !== null ? data.sat_score.toString() : "",
				colleges: data.university !== null ? data.university : "",
				apClasses: data.ap_classes !== null ? data.ap_classes.toString() : "",
				ap_classes_list:
					data.ap_classes_list !== null ? data.ap_classes_list.toString() : "",
				extracurriculars: data.ext_act !== null ? data.ext_act : "",
				interestedIndustries: data.carrer !== null ? data.carrer : "",
				financialContribution: data.f_contri !== null ? data.f_contri : "",
			});

			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching user info:", error);
			setIsLoading(false);
		}
	}, [token]);

	const handleSubmit = useCallback(async () => {
		try {
			setIsLoading(true);

			const payload = {
				act_score: parseFloat(formData.latestACT),
				ap_classes: parseFloat(formData.apClasses),
				ap_classes_list: formData.ap_classes_list,
				carrer: formData.interestedIndustries,
				ext_act: formData.extracurriculars,
				f_contri: formData.financialContribution,
				flag: 1,
				gpa_score: parseFloat(formData.latestGPA),
				sat_score: parseFloat(formData.latestSAT),
				university: formData.colleges,
			};

			const response = await fetchWithToken(
				`${process.env.NEXT_PUBLIC_API_URL}/updateUserInfo`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(payload),
				}
			);

			if (!response || !response.ok) {
				console.error("Error updating user info");
			}

			setIsLoading(false);
		} catch (error) {
			console.error("Error updating user info:", error);
			setIsLoading(false);
		}
	}, [formData, token]);

	useEffect(() => {
		getUserData();
	}, [getUserData]);

	return (
		<NavBar>
			{isLoading ? (
				<LinearBuffer />
			) : (
				<Container>
					<Grid container spacing={1}>
						<Grid
							item
							xs={12}
							style={{ paddingTop: "50px", paddingBottom: "50px" }}
						>
							<Box display='flex' p={1}>
								<Typography variant='h2' style={titleStyle}>
									My Profile
								</Typography>
							</Box>
							<Typography variant='h2' style={headerStyle}>
								This is your personalized profile page. You can always update
								your information here, or add additional facts about yourself
								that you’d like me to remember. The more information you give
								me, the better I can get to know you and provide you with the
								most personalized experience possible. I’m always happy to hear
								from you.
							</Typography>
						</Grid>

						<Grid item xs={12}>
							<Typography component='h2' style={typographyStyle}>
								Latest GPA
							</Typography>
							<TextField
								variant='outlined'
								value={formData.latestGPA}
								onChange={(e) =>
									setFormData({ ...formData, latestGPA: e.target.value })
								}
								InputProps={{
									style: {
										borderRadius: "3.125rem",
										border: "1px solid var(--kaplan-deep-purle, #190755)",
										textDecoration: "none",
										width: "60px",
									},
									inputProps: {
										style: {
											padding: "5px 10px",
										},
									},
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography component='h2' style={typographyStyle}>
								Latest ACT
							</Typography>
							<TextField
								variant='outlined'
								value={formData.latestACT}
								onChange={(e) =>
									setFormData({ ...formData, latestACT: e.target.value })
								}
								InputProps={{
									style: {
										borderRadius: "3.125rem",
										border: "1px solid var(--kaplan-deep-purle, #190755)",
										textDecoration: "none",
										width: "60px",
									},
									inputProps: {
										// Use 'inputProps' instead of '& input'
										style: {
											padding: "5px 10px",
										},
									},
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography component='h2' style={typographyStyle}>
								Latest SAT
							</Typography>
							<TextField
								variant='outlined'
								value={formData.latestSAT}
								onChange={(e) =>
									setFormData({ ...formData, latestSAT: e.target.value })
								}
								InputProps={{
									style: {
										borderRadius: "3.125rem",
										border: "1px solid var(--kaplan-deep-purle, #190755)",
										textDecoration: "none",
										width: "60px",
									},
									inputProps: {
										// Use 'inputProps' instead of '& input'
										style: {
											padding: "5px 10px",
										},
									},
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography component='h2' style={typographyStyle}>
								Colleges I am considering to apply
							</Typography>
							{formData.colleges.split(",").map((college, index) => (
								<div key={index} style={boxStyle}>
									{college.trim()}
									<IconButton size='small' style={{ marginLeft: "5px" }}>
										<CheckIcon style={{ color: "#FFF" }} />
									</IconButton>
								</div>
							))}
							<StyledButton
								text='Search College'
								style={{ margin: "0px" }}
								onClick={() => router.push("/colleges")}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography component='h2' style={typographyStyle}>
								AP Classes I am taking
							</Typography>
							{formData.ap_classes_list.split(",").map((apClass, index) => (
								<div key={index} style={boxStyle}>
									{apClass.trim()}
									<IconButton
										size='small'
										onClick={() => removeItem("ap_classes_list", index)}
										style={{ marginLeft: "5px" }}
									>
										<CheckIcon style={{ color: "#FFF" }} />
									</IconButton>
								</div>
							))}
						</Grid>

						<Grid item xs={12}>
							<Typography component='h2' style={typographyStyle}>
								Extracurriculars
							</Typography>
							{formData.extracurriculars
								.split(",")
								.map((extracurricular, index) => (
									<div key={index} style={boxStyle}>
										{extracurricular.trim()}
										<IconButton
											size='small'
											onClick={() => removeItem("extracurricular", index)}
											style={{ marginLeft: "5px" }}
										>
											<CheckIcon style={{ color: "#FFF" }} />
										</IconButton>
									</div>
								))}
						</Grid>

						<Grid item xs={12}>
							<Typography component='h2' style={typographyStyle}>
								Interested Industries
							</Typography>
							{formData.interestedIndustries
								.split(",")
								.map((industry, index) => (
									<div key={index} style={boxStyle}>
										{industry.trim()}
										<IconButton
											size='small'
											onClick={() => removeItem("interestedIndustries", index)} // Fixed call to removeItem
											style={{ marginLeft: "5px" }}
										>
											<CheckIcon style={{ color: "#FFF" }} />
										</IconButton>
									</div>
								))}
						</Grid>

						<Grid item xs={12}>
							<Typography component='h2' style={typographyStyle}>
								Financial Contribution Level
							</Typography>
							<div style={divStyle}>{formData.financialContribution}</div>
						</Grid>
						<Grid item xs={12}>
							<StyledButton text='Update Profile' onClick={handleSubmit} />
						</Grid>
					</Grid>
				</Container>
			)}
		</NavBar>
	);
};

export default Profile;
