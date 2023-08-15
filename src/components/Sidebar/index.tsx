import React from "react";
import { useRouter } from "next/router";
import { SidebarContainer, TopSection, SvgButton, Spacer } from "./styles";
import MyStats from "../MyStats/";

const Sidebar = () => {
	const router = useRouter();

	const navigateToMyPlan = () => {
		router.push("/myplan");
	};

	return (
		<SidebarContainer>
			{(router.pathname === "/colleges" || router.pathname !== "/myplan") && (
				<>
					<TopSection style={{ display: "flex", alignItems: "center" }}>
						<h3
							onClick={navigateToMyPlan}
							style={{
								color: "#190755",
								marginRight: "10px",
								cursor: "pointer",
							}}
						>
							My Plan
						</h3>
						<SvgButton
							width='39'
							height='30'
							viewBox='0 0 39 30'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M29.164 0C25.7764 0 22.1283 0.7 19.6093 2.625C17.0904 0.7 13.4422 0 10.0547 0C7.5357 0 4.8604 0.385 2.6194 1.3825C1.35123 1.96 0.5 3.2025 0.5 4.62V24.36C0.5 26.635 2.6194 28.315 4.80828 27.755C6.51075 27.3175 8.31745 27.125 10.0547 27.125C12.7647 27.125 15.6485 27.58 17.9763 28.735C19.0187 29.26 20.2 29.26 21.2249 28.735C23.5528 27.5625 26.4365 27.125 29.1466 27.125C30.8838 27.125 32.6905 27.3175 34.393 27.755C36.5819 28.3325 38.7012 26.6525 38.7012 24.36V4.62C38.7012 3.2025 37.85 1.96 36.5819 1.3825C34.3582 0.385 31.6829 0 29.164 0ZM35.2442 22.2775C35.2442 23.38 34.2366 24.185 33.1595 23.9925C31.8566 23.7475 30.5016 23.6425 29.164 23.6425C26.2107 23.6425 21.9545 24.78 19.6093 26.2675V6.125C21.9545 4.6375 26.2107 3.5 29.164 3.5C30.7622 3.5 32.3431 3.6575 33.8544 3.99C34.6536 4.165 35.2442 4.8825 35.2442 5.705V22.2775Z'
								fill='#190755'
							/>
							<path
								d='M22.7985 12.3595C22.2426 12.3595 21.7388 12.0095 21.5651 11.4495C21.3392 10.767 21.7214 10.0145 22.3989 9.80453C25.0742 8.92953 28.5313 8.64953 31.7104 9.01703C32.4226 9.10453 32.9438 9.75203 32.8569 10.4695C32.7701 11.187 32.1273 11.712 31.4151 11.6245C28.6008 11.292 25.5259 11.5545 23.1981 12.307C23.0591 12.3245 22.9201 12.3595 22.7985 12.3595Z'
								fill='#190755'
							/>
							<path
								d='M22.7985 17.0041C22.2426 17.0041 21.7388 16.6541 21.5651 16.0941C21.3392 15.4116 21.7214 14.6591 22.3989 14.4491C25.0569 13.5741 28.5313 13.2941 31.7104 13.6616C32.4226 13.7491 32.9438 14.3966 32.8569 15.1141C32.7701 15.8316 32.1273 16.3566 31.4151 16.2691C28.6008 15.9366 25.5259 16.1991 23.1981 16.9516C23.0591 16.9866 22.9201 17.0041 22.7985 17.0041Z'
								fill='#190755'
							/>
							<path
								d='M22.7985 21.6603C22.2426 21.6603 21.7388 21.3103 21.5651 20.7503C21.3392 20.0678 21.7214 19.3153 22.3989 19.1053C25.0569 18.2303 28.5313 17.9503 31.7104 18.3178C32.4226 18.4053 32.9438 19.0528 32.8569 19.7703C32.7701 20.4878 32.1273 20.9953 31.4151 20.9253C28.6008 20.5928 25.5259 20.8553 23.1981 21.6078C23.0591 21.6428 22.9201 21.6603 22.7985 21.6603Z'
								fill='#190755'
							/>
						</SvgButton>
					</TopSection>
					<Spacer />
				</>
			)}
			{router.pathname === "/myplan" && <MyStats />}{" "}
			{/* Renderizar o componente MyStats apenas se a rota atual for '/myplan' */}
		</SidebarContainer>
	);
};

export default Sidebar;
