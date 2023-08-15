import React, { useRef } from "react";
import { Box, Button } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CollegeCards from "./CollegeCards";

type CarouselContainerProps = {
	cardLength: number;
	colleges: any[];
	handleFavoriteToggle: any;
	noAddCard?: boolean;
};

const CarouselContainer = ({
	cardLength,
	colleges,
	handleFavoriteToggle,
	noAddCard,
}: CarouselContainerProps) => {
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

	return (
		<Box
			className='carousel-container'
			sx={{
				marginTop: "20px",
				marginBottom: "50px",
				display: "flex",
				gap: "20px",
				position: "relative",
			}}
		>
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
					width: "100%",
					gap: "25px",
					scrollBehavior: "smooth",
					"&::-webkit-scrollbar": {
						display: "none",
					},
					"-ms-overflow-style": "none",
					scrollbarWidth: "none",
				}}
			>
				<CollegeCards
					cardLength={cardLength}
					colleges={colleges}
					eachCardRef={eachCardRef}
					handleFavoriteToggle={handleFavoriteToggle}
					noAddCard={noAddCard}
				/>
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
		</Box>
	);
};

export default CarouselContainer;
