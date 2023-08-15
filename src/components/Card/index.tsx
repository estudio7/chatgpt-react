import React, { useState, useEffect, useCallback, ReactNode } from "react";
import { Box, Typography } from "@mui/material";

import { StyledCard, Data, Title, FlipCardFront, FlipCardBack } from "./styles";
import { CollegeData } from "../../types/types";
import { getToken } from "../../services/auth";
import { AddCommaDelimiter } from "../../utils/utils";
import FlipIcon from "./FlipIcon";
import AddIcon from "./AddIcon";
import RemoveIcon from "./RemoveIcon";

interface CardProps {
	data: CollegeData;
	onFavoriteToggle: (college: CollegeData) => void;
	source: string;
}

const CollegeCard: React.FC<CardProps> = ({
	data,
	onFavoriteToggle,
	source,
}) => {
	const [isFavorite, setIsFavorite] = useState<boolean>(data.is_favorite === 1);
	const [flipToBack, setFlipToBack] = useState<boolean>(false);

	useEffect(() => {
		setIsFavorite(data.is_favorite === 1);
	}, [data.is_favorite]);

	const handleFavoriteClick = useCallback(() => {
		const { university_id, is_favorite } = data;
		const url =
			is_favorite === undefined
				? `createSuggestion/${university_id}`
				: `suggestions/${university_id}/update_favorite`;
		fetch(
			`${process.env.NEXT_PUBLIC_API_URL}${
				source === "myplan"
					? `suggestions/${university_id}/update_favorite`
					: url
			}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getToken()}`,
				},
				body: JSON.stringify({
					is_favorite: is_favorite === 1 ? 0 : 1,
				}),
			}
		)
			.then((response) => response.json())
			.then((successMessage) => {
				onFavoriteToggle({
					...data,
					is_favorite: successMessage.message ? 1 : successMessage.is_favorited,
				});
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}, [data, onFavoriteToggle, source]);

	return (
		<StyledCard>
			<Title>
				<Typography
					title={data["College Name"]}
					sx={{ fontSize: "16px", fontWeight: "bold", fontFamily: "OpenSans" }}
				>
					{data["College Name"]}
				</Typography>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						gap: "10px",
					}}
				>
					<FlipIcon
						onClick={() => setFlipToBack(!flipToBack)}
						style={{ cursor: "pointer" }}
					/>
					{isFavorite ? (
						<RemoveIcon
							style={{ color: "#190755", cursor: "pointer" }}
							onClick={handleFavoriteClick}
						/>
					) : (
						<AddIcon
							style={{ color: "#190755", cursor: "pointer" }}
							onClick={handleFavoriteClick}
						/>
					)}
				</Box>
			</Title>
			<Box
				style={{
					position: "relative",
					textAlign: "center",
					padding: "10px 20px",
					transition: "transform 0.8s",
					transformStyle: "preserve-3d",
					transform: flipToBack ? "rotateY(180deg)" : "rotateY(0)",
				}}
			>
				<Box
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						height: "100%",
						zIndex: 2,
						visibility: flipToBack ? "visible" : "hidden",
						width: flipToBack ? "100%" : "50%",
					}}
				></Box>
				<Box
					style={{
						position: "absolute",
						top: 0,
						right: 0,
						height: "100%",
						zIndex: 2,
						visibility: flipToBack ? "visible" : "hidden",
						width: flipToBack ? "100%" : "50%",
					}}
				></Box>
				<FlipCardFront>
					<Data bgcolor={data["GPA Score"] ? data["GPA_flag_color"] : ""}>
						<span>Avg GPA:</span>
						<span>
							{data["GPA Score"] ? data["GPA Score"]?.toFixed(1) : "N/A"}
						</span>
					</Data>
					<Data bgcolor={data["SAT Score"] ? data["SAT_flag_color"] : ""}>
						<span>Avg SAT:</span>
						<span>{data["SAT Score"] ? data["SAT Score"] : "N/A"}</span>
					</Data>
					<Data bgcolor={data["ACT Score"] ? data["ACT_flag_color"] : ""}>
						<span>Avg ACT:</span>
						<span>{data["ACT Score"] ? data["ACT Score"] : "N/A"}</span>
					</Data>
					{source === "myplan" ? (
						<Data>
							<span>Status (S/T/R):</span>
							<span>{data["Acceptance probability"]}</span>
						</Data>
					) : (
						<Data>
							<span>Acceptance Rate:</span>
							<span>
								{!data["Acceptance Rate"]
									? "N/A"
									: `${(data["Acceptance Rate"] * 100).toFixed(1)}%`}
							</span>
						</Data>
					)}
					<Data>
						<span>Location:</span>
						<span>{`${[data.city || "", data["stabbr"] || ""].join(
							", "
						)}`}</span>
					</Data>
				</FlipCardFront>
				<FlipCardBack>
					{source === "myplan" && (
						<Data>
							<span>Acceptance Rate:</span>
							<span>
								{!data["Acceptance Rate"]
									? "N/A"
									: `${(data["Acceptance Rate"] * 100).toFixed(1)}%`}
							</span>
						</Data>
					)}
					<Data>
						<span>Tuition in/out:</span>
						<span>
							${AddCommaDelimiter(data["tuition2"])} / $
							{AddCommaDelimiter(data["tuition3"])}
						</span>
					</Data>
					<Data>
						<span>Type:</span>
						<span>{data["type"]}</span>
					</Data>
					<Data>
						<span>Size:</span>
						<span>{data["size"]}</span>
					</Data>
					<Data>
						<span>Website:</span>
						<span>
							<a
								href={`https://${data["webaddr"]}`}
								target='_blank'
								rel='noopener noreferrer'
							>
								{data["webaddr"]}
							</a>
						</span>
					</Data>
				</FlipCardBack>
			</Box>
		</StyledCard>
	);
};

export default CollegeCard;
