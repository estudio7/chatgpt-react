import styled from "@emotion/styled";
import { Card as MuiCard, Typography } from "@mui/material";

export const StyledCard = styled(MuiCard)`
	border: 1px solid #a0a0a0;
	border-radius: 0 0 30px 0;
	margin-bottom: 20px;
	padding: 20px;
`;

export const Title = styled(Typography)`
	font-family: "Merriweather";
	font-style: normal;
	font-weight: 700;
	font-size: 20px;
	line-height: 160%;
	color: #190755;
`;

export const Data = styled(Typography)<{ bgcolor?: string }>`
	background: ${(props) => props.bgcolor || "#EFEFEF"};
	border-radius: 50px;
	color: ${(props) => (props.bgcolor ? "#ffffff" : "#190755")};
	padding: 10px;
	margin: 0.5rem 0;
`;

export const SidebarContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px;
	background-color: #fff;
	position: fixed;
	right: 0;
	top: 200px;
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
	min-width: "205px";
	box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
		rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
`;
export const Spacer = styled.div`
	height: 100px;
`;

export const TopSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const StatLine = styled(Typography)`
	font-size: 16px;
	color: #190755;
	margin: 0.5em 0;
`;

export const Button = styled.button<{ bgcolor: string }>`
	border-radius: 50px;
	background: ${(props) => props.bgcolor};
	color: white;
	padding: 0.5em 1em;
	margin: 0.5em 0;
	border: none;
	cursor: pointer;
	width: 100%;
	display: block;
`;

export const SvgButton = styled.svg`
	fill: currentColor;
`;
