import styled from "@emotion/styled";
import { Card as MuiCard, Typography, CardContent, Box } from "@mui/material";

export const StyledCard = styled(Box)`
	border: 0.5px dashed #a0a0a0;
	margin-bottom: 20px;
	padding-top: 10px;
	perspective: 1000px;
	width: 100%;
	height: 320px;
	border-bottom-right-radius: 25px;
`;

export const StyledTitle = styled(Typography)`
	font-family: "Merriweather";
	font-style: normal;
	font-weight: 700;
	font-size: 16px;
	line-height: 160%;
	color: #190755;
	min-height: 40px;
`;

export const Data = styled(Typography)<{ bgcolor?: string }>`
	background: ${(props) => props.bgcolor || "#EFEFEF"};
	border-radius: 50px;
	color: ${(props) => (props.bgcolor ? "#ffffff" : "#190755")};
	padding: 7px 10px;
	display: flex;
	justify-content: space-between;
	margin: 0.5rem 0;
	font-size: 14px;
`;

export const Title = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-family: "Merriweather";
	font-style: normal;
	font-weight: 700;
	font-size: 20px;
	line-height: 55px;
	color: #190755;
	min-height: 40px;
	gap: 20px;
	padding: 0 20px;
	justify-content: space-between;
	align-items: "flex-start";
`;

export const FlipCardFront = styled(Box)(({ theme }) => ({
	position: "absolute",
	width: "calc(100% - 40px)",
	height: "100%",
	transformStyle: "preserve-3d",
	transition: "transform 0.5s ease-in-out",
	backfaceVisibility: "hidden",
}));

export const FlipCardBack = styled(Box)(({ theme }) => ({
	position: "absolute",
	width: "calc(100% - 40px)",
	height: "100%",
	transformStyle: "preserve-3d",
	transition: "transform 0.5s ease-in-out",
	backfaceVisibility: "hidden",
	transform: "rotateY(180deg)",
}));
