// src/pages/onboarding.tsx
import MainContent from "../components/onboarding/components/MainContent";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { getToken, getUserId, authenticate } from "../services/auth";
import NavBar from "../components/NavBar/index";

const Onboarding = () => {
	useEffect(() => {
		const token = getToken();
		const userId = getUserId();

		if (token && userId) {
			authenticate(token);
		}
	}, []);

	return (
		<div>
			<NavBar> </NavBar>
			<Header />
			<MainContent />
			<Sidebar />
		</div>
	);
};

export default Onboarding;
