import React, { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { StyledProgressIndicator, StyledProgressIndicatorIcon } from "./styles";
import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface HeaderProps {
	hideAskButton?: boolean;
	progress?: any[];
}
interface ProgressIndicatorProps {
	progress: any[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progress }) => (
	<>
		<StyledProgressIndicator>
			{progress[0] >= 1 ? (
				<>
					<Box
						sx={{
							flex: 1,
							height: "3px",
							backgroundColor: "green",
						}}
					>
						&nbsp;
					</Box>
					<StyledProgressIndicatorIcon>
						<CheckIcon fontSize='small' sx={{ width: "15px" }} />
					</StyledProgressIndicatorIcon>
				</>
			) : (
				<>
					<Box
						sx={{
							flex: 1,
							height: "3px",
							backgroundColor: "#190755",
						}}
					>
						&nbsp;
					</Box>
					<Box
						sx={{
							flex: 1,
							height: "3px",
							backgroundColor: progress[0] > 0.33 ? "#190755" : "#ddd",
						}}
					>
						&nbsp;
					</Box>
					<Box
						sx={{
							flex: 1,
							height: "3px",
							backgroundColor: progress[0] > 0.66 ? "#190755" : "#ddd",
						}}
					>
						&nbsp;
					</Box>
				</>
			)}
		</StyledProgressIndicator>
		<Box>
			<Typography
				variant='caption'
				display='block'
				gutterBottom
				sx={{
					fontSize: "12px",
					fontStyle: "italic",
					textAlign: "right",
					color: "#190755",
					fontWeight: "600",
					letterSpacing: 0,
				}}
			>
				{progress[0] < 0.5
					? "Gathering scores..."
					: progress[0] < 0.75
					? "Getting close..."
					: progress[0] < 1
					? " One more question!"
					: "Your Plan is Ready!"}
			</Typography>
		</Box>
	</>
);

const Header: React.FC<HeaderProps> = ({ progress = [0] }) => {
	const router = useRouter();

	const isChatPage = router.pathname === "/myplan";
	const isChat = router.pathname === "/chat";

	return (
		(isChatPage || isChat) && (
			<Box
				className='k-header'
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					gap: "10px",
				}}
			>
				<ProgressIndicator progress={progress} />
			</Box>
		)
	);
};

export default Header;
