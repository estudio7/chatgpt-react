import { Box, Link, Typography } from "@mui/material";
import { useRouter } from "next/router";
import RefreshIcon from "@mui/icons-material/Refresh";

const OnBoardingInProgressMessage = () => {
	const router = useRouter();

	const handleTryAgain = () => {
		router.reload();
	};
	const handleCompleteOnboarding = () => {
		router.push("/chat");
	};
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				backgroundColor: "#f0f0f0",
			}}
		>
			<Typography
				variant='h6'
				sx={{ marginBottom: 2, fontWeight: "bold", color: "#1E0576" }}
			>
				Please make sure to complete the onboarding process.
			</Typography>
			<Box sx={{ display: "flex", gap: "30px" }}>
				<Link
					onClick={handleCompleteOnboarding}
					sx={{
						cursor: "pointer",
						display: "flex",
						alignItems: "center",
						gap: 5,
						fontSize: "1rem",
						color: "#1976d2",
						textDecoration: "none",
					}}
				>
					Complete onboarding
				</Link>

				<Link
					onClick={handleTryAgain}
					sx={{
						cursor: "pointer",
						display: "flex",
						alignItems: "center",
						gap: "10px",
						fontSize: "1rem",
						color: "#1976d2",
						textDecoration: "none",
					}}
				>
					<RefreshIcon sx={{ fontSize: "1.4rem" }} />
					Try again
				</Link>
			</Box>
		</Box>
	);
};

export default OnBoardingInProgressMessage;
