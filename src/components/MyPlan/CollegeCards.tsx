import { Box, Grid } from "@mui/material";
import BlankCard from "../BlankCard";
import CollegeCard from "../Card";

const LoadBlankCard = ({ cardLength }: { cardLength: number }) => {
	if (cardLength >= 3) return null;
	return (
		<Box sx={{ width: "32%" }}>
			<BlankCard />
		</Box>
	);
};

const CollegeCards = ({
	colleges,
	handleFavoriteToggle,
	cardLength,
	eachCardRef,
	noAddCard,
}: {
	colleges: any[];
	handleFavoriteToggle: any;
	cardLength: number;
	eachCardRef: any;
	noAddCard?: boolean;
}) => {
	return (
		<>
			{colleges.map((collegeData, index) => (
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
			{noAddCard !== true && cardLength < 3 && (
				<Box
					sx={{
						minWidth: "100%",
					}}
				>
					<LoadBlankCard cardLength={cardLength} />
				</Box>
			)}
		</>
	);
};

export default CollegeCards;
