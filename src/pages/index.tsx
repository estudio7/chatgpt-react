import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { saveToken, getToken } from "../services/auth";
import Header from "../components/Header/Header";
import LinearBuffer from "../components/LinearBuffer";
import Box from "@mui/material/Box";
import styles from "../styles/Home.module.css";

const Home = () => {
	const router = useRouter();
	let initialToken = router.query.token;
	if (Array.isArray(initialToken)) {
		initialToken = initialToken[0];
	}
	const [token, setToken] = useState<string | undefined>(initialToken);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		if (router.isReady) {
			let currentToken = router.query.token;
			if (Array.isArray(currentToken)) {
				currentToken = currentToken[0];
			}
			setToken(currentToken);
		}
	}, [router.isReady, router.query.token]);

	const checkUserAndRedirect = useCallback(async () => {
		if (token) {
			await saveToken(token);
		}
		const tokenFromStorage = getToken();
		console.log("Token from storage:", tokenFromStorage);

		if (tokenFromStorage) {
			// Call the checkUser endpoint before redirecting
			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}checkUser`,
					{
						headers: { Authorization: `Bearer ${tokenFromStorage}` },
					}
				);
				console.log("Check user response:", response.data); // log the checkUser response
			} catch (error) {
				console.error("Error checking user: ", error);
			}

			console.log("Redirecting to /chat");
			router.push("/chat");
		} else {
			console.log("Redirecting to /onboarding");
			setError("User Not validated. Ask KapAvisor for help!");
		}
		setLoading(false);
	}, [router, token]);

	useEffect(() => {
		if (router.isReady) {
			checkUserAndRedirect();
		}
	}, [router.isReady, checkUserAndRedirect]);

	if (loading) {
		return <LinearBuffer />;
	}

	return (
		<>
			<Header />
			{error ? (
				<Box display='flex' justifyContent='center' marginTop={5}>
					<h1 className={styles.styledH1}>{error}</h1>
				</Box>
			) : (
				<LinearBuffer />
			)}
		</>
	);
};

export default Home;
