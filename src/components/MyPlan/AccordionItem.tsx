import React, { useRef } from "react";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box,
	Grid,
	Typography,
	Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import CollegeCard from "../Card";
import { CollegeData } from "../../types/types";
import BlankCard from "../BlankCard";

const accordionStyle = { backgroundColor: "transparent", boxShadow: "none" };
const summaryStyle = {
	border: "1px solid #ddd",
	boxShadow: "none",
	minHeight: "0 !important",
	padding: "5px 10px",
	marginBottom: "20px",
	".summary-subtitle": {
		color: "#240F6E",
		fontSize: "16px",
		fontWeight: "bold",
	},
	".MuiAccordionSummary-content": {
		margin: "0 !important",
	},
};

const accordionDetailsStyle = {
	padding: "0 !important",
	position: "relative",
};

const loadBlankCard = (cardLength: number) => {
	if (cardLength >= 3) return null;
	return (
		<Grid item xs={12} sm={6} md={4} lg={4}>
			<BlankCard />
		</Grid>
	);
};

interface AccordionItemProps {
	expanded: boolean;
	onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
	summaryText: string;
	selections: CollegeData[];
	handleFavoriteToggle: (college: CollegeData) => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
	expanded,
	onChange,
	summaryText,
	selections,
	handleFavoriteToggle,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const eachCardRef = useRef<HTMLDivElement>(null);

	const handleScrollLeft = () => {
		if (containerRef.current && eachCardRef.current) {
			const eachCardWidth = eachCardRef.current.clientWidth;
			containerRef.current.scrollLeft -= eachCardWidth + 25;
		}
	};

	const handleScrollRight = () => {
		if (containerRef.current && eachCardRef.current) {
			const eachCardWidth = eachCardRef.current.clientWidth;
			containerRef.current.scrollLeft += eachCardWidth + 25;
		}
	};

	const cardLength = selections.length;

	return (
		<Accordion expanded={expanded} onChange={onChange} sx={accordionStyle}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls={`panel-${selections[0]?.["Acceptance probability"]}-content`}
				id={`panel-${selections[0]?.["Acceptance probability"]}-header`}
				sx={summaryStyle}
			>
				<Box sx={{ width: "100%", textAlign: "center" }}>
					<Typography variant='subtitle2' className='summary-subtitle'>
						{`${summaryText} (${cardLength})`}
					</Typography>
				</Box>
			</AccordionSummary>
			<AccordionDetails sx={accordionDetailsStyle}>
				{cardLength > 3 && (
					<Button
						onClick={handleScrollLeft}
						sx={{
							backgroundColor: "#ddd",
							borderRadius: "50%",
							aspectRatio: "1/1",
							position: "absolute",
							minWidth: "45px",
							left: "-25px",
							top: "calc(50% - 40px) ",
							zIndex: 1,
						}}
					>
						<KeyboardDoubleArrowLeftIcon />
					</Button>
				)}
				<Box
					role='list'
					ref={containerRef}
					sx={{
						display: "flex",
						flexWrap: "nowrap",
						overflowX: "hidden",
						overflowY: "hidden",
						gap: "25px",
						scrollBehavior: "smooth",
						"&::-webkit-scrollbar": {
							display: "none",
						},
						"-ms-overflow-style": "none",
						scrollbarWidth: "none",
					}}
				>
					{selections.map((collegeData, index) => (
						<Box
							key={index}
							role='listitem'
							ref={eachCardRef}
							sx={{
								minWidth: "max(calc(33.4% - 25px ), 250px)",
							}}
						>
							<CollegeCard
								data={collegeData}
								onFavoriteToggle={handleFavoriteToggle}
								source='myplan'
							/>
						</Box>
					))}
					{loadBlankCard(selections.length)}
				</Box>
				{cardLength > 3 && (
					<Button
						onClick={handleScrollRight}
						sx={{
							backgroundColor: "#ddd",
							borderRadius: "50%",
							aspectRatio: "1/1",
							position: "absolute",
							minWidth: "45px",
							right: "-35px",
							top: "calc(50% - 40px) ",
							zIndex: 1,
						}}
					>
						<KeyboardDoubleArrowRightIcon />
					</Button>
				)}
			</AccordionDetails>
		</Accordion>
	);
};

export default AccordionItem;
