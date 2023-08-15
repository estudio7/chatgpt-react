import React, {
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { getOnboardingStatus } from "../../services/auth";
import Logo from "../../svgs/Logo";
import Advisor from "../../svgs/AdvisorIcon";
import MyPlan from "../../svgs/MyPlan";
import Search from "../../svgs/Search";
import Profile from "../../svgs/Profile";
import MyPlan1 from "./SvgMyPlan1";
import MyPlan2 from "./SvgMyPlan2";
import MyPlan3 from "./SvgMyPlan3";
import MyPlan4 from "./SvgMyPlan4";
import MyPlan5 from "./SvgMyPlan5";
import Link from "next/link";
import { useRouter } from "next/router";

const drawerWidth = 100;

const selectedItemsStyle = {
	color: "#240F6E",
	backgroundColor: "#ffffff",
	borderTopRightRadius: "10px",
	borderBottomRightRadius: "10px",
	paddingLeft: "0",
	".menuIcon": {
		color: "#240F6E",
	},
	".menuLabel": {
		color: "#240F6E",
		fontWeight: "700",
		span: { fontSize: "12px" },
	},
};

const menuStyle = {
	marginBottom: "10px",
	fontSize: "12px",
	maxWidth: drawerWidth - 10 + "px",
	".menuBtn": {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		transition: "all 0.05s",
		padding: "10px 0",
		minHeight: "80px",
		width: "89px",
		a: {
			width: "100%",
			textAlign: "center",
		},
	},
	".menuLabel": {
		span: { fontSize: "12px" },
	},
	".menuIconCnt": {
		minWidth: "auto",
	},
	"&:hover": {
		".menuBtn": selectedItemsStyle,
	},
};

const menus = [
	{
		key: "advisor",
		label: "KapAdvisor",
		icon: Advisor,
		path: "/chat",
	},
	{
		key: "plan",
		label: "MyPlan",
		icon: MyPlan,
		path: "/myplan",
	},
	{
		key: "college",
		label: `Search Colleges`,
		icon: Search,
		path: "/colleges",
	},
	{
		key: "profile",
		label: "My Profile",
		icon: Profile,
		path: "/profile",
	},
];

function OnBoardingProgress({
	progress,
	selectedMenu,
}: {
	progress: any;
	selectedMenu: any;
}) {
	return (
		<ListItemIcon className='menuIconCnt'>
			{progress[0] < 0.25 ? (
				<MyPlan1 className='menuIcon' />
			) : progress[0] < 0.5 ? (
				<MyPlan2 className='menuIcon' />
			) : progress[0] < 1 ? (
				<MyPlan3 className='menuIcon' />
			) : selectedMenu.key === "advisor" ? (
				<MyPlan5 className='menuIcon' />
			) : (
				<MyPlan4 className='menuIcon' />
			)}
		</ListItemIcon>
	);
}

export default function NavBar({ children }: { children: ReactNode }) {
	const [selectedMenu, setSelectedMenu] = useState<{ key: any }>({ key: "" });
	const [progress, setProgress] = useState<[number, string]>([
		0,
		"in progress",
	]);
	const progressInterval = useRef<NodeJS.Timeout | null>(null);
	const router = useRouter();

	useEffect(() => {
		const currentPathname = router.pathname;

		const matchingMenu = menus.find((menu) => menu.path === currentPathname);

		if (matchingMenu) {
			setSelectedMenu(matchingMenu);
		}
	}, [router.pathname]);

	const checkOnboardingProgress = useCallback(async () => {
		const message = await getOnboardingStatus();
		if (message) {
			setProgress(message);
		}
	}, [setProgress]);

	useEffect(() => {
		checkOnboardingProgress();
		progressInterval.current = setInterval(() => {
			checkOnboardingProgress();
		}, 5000);

		return () => {
			if (progressInterval.current !== null) {
				clearInterval(progressInterval.current);
			}
		};
	}, [checkOnboardingProgress]);

	useEffect(() => {
		if (progress[1] === "complete" && progressInterval.current !== null) {
			clearInterval(progressInterval.current);
		}
	}, [progress]);

	return (
		<Box>
			<CssBaseline />
			<Drawer
				variant='permanent'
				anchor='left'
				sx={{
					"& .MuiDrawer-paper": {
						width: drawerWidth + "px",
						backgroundColor: "#A0A0A03D",
						overflow: "hidden",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					},
				}}
			>
				<List sx={{ margin: 0, padding: 0 }}>
					<ListItem sx={{ padding: 0 }}>
						<Link href={"/chat"} replace>
							<Box
								sx={{
									width: drawerWidth + "px",
									backgroundColor: "#1E0576",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									color: "#ffffff",
									height: "55px",
									cursor: "pointer",
								}}
							>
								<Logo />
							</Box>
						</Link>
					</ListItem>
					<ListItem
						key={"advisor"}
						disablePadding
						sx={{
							...menuStyle,
							marginTop: "150px",
							...("advisor" === selectedMenu.key ? selectedItemsStyle : {}),
						}}
					>
						<ListItemButton className='menuBtn'>
							<Link
								href={"/chat"}
								replace
								onClick={(e) =>
									selectedMenu.key === "advisor" && e.preventDefault()
								}
								style={
									selectedMenu.key === "advisor" ? { cursor: "default" } : {}
								}
							>
								<ListItemIcon className='menuIconCnt'>
									<Advisor fontSize='large' className='menuIcon' />
								</ListItemIcon>
								<ListItemText primary={"KapAdvisor"} className='menuLabel' />
							</Link>
						</ListItemButton>
					</ListItem>
					<ListItem
						key={"plan"}
						disablePadding
						sx={{
							...menuStyle,
							...("plan" === selectedMenu.key ? selectedItemsStyle : {}),
							pointerEvents: progress[0] < 1 ? "none" : "",
						}}
					>
						<ListItemButton className='menuBtn'>
							<Link
								href={"/myplan"}
								onClick={(e) =>
									selectedMenu.key === "plan" && e.preventDefault()
								}
								style={selectedMenu.key === "plan" ? { cursor: "default" } : {}}
							>
								<OnBoardingProgress
									progress={progress}
									selectedMenu={selectedMenu}
								/>
								<ListItemText primary={"MyPlan"} className='menuLabel' />
							</Link>
						</ListItemButton>
					</ListItem>
					<ListItem
						key={"college"}
						disablePadding
						sx={{
							...menuStyle,
							...("college" === selectedMenu.key ? selectedItemsStyle : {}),
							pointerEvents: progress[0] < 1 ? "none" : "",
						}}
					>
						<ListItemButton className='menuBtn'>
							<Link
								href={"/colleges"}
								onClick={(e) =>
									selectedMenu.key === "college" && e.preventDefault()
								}
								style={
									selectedMenu.key === "profile" ? { cursor: "default" } : {}
								}
							>
								<ListItemIcon className='menuIconCnt'>
									<Search fontSize='large' className='menuIcon' />
								</ListItemIcon>
								<ListItemText primary={"Search"} className='menuLabel' />
								<ListItemText primary={"Colleges"} className='menuLabel' />
							</Link>
						</ListItemButton>
					</ListItem>
					<ListItem
						key={"profile"}
						disablePadding
						sx={{
							...menuStyle,
							...("profile" === selectedMenu.key ? selectedItemsStyle : {}),
							pointerEvents: progress[0] < 1 ? "none" : "",
						}}
					>
						<ListItemButton className='menuBtn'>
							<Link
								href={"/profile"}
								onClick={(e) =>
									selectedMenu.key === "profile" && e.preventDefault()
								}
								style={
									selectedMenu.key === "profile" ? { cursor: "default" } : {}
								}
							>
								<ListItemIcon className='menuIconCnt'>
									<Profile fontSize='large' className='menuIcon' />
								</ListItemIcon>
								<ListItemText primary={"My Profile"} className='menuLabel' />
							</Link>
						</ListItemButton>
					</ListItem>
				</List>
				<span
					style={{
						backgroundColor: "#ffc34b",
						height: "30px",
						textAlign: "center",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						fontSize: "16px",
						fontWeight: "bold",
						letterSpacing: "2px",
					}}
				>
					BETA
				</span>
			</Drawer>
			<Box sx={{ marginLeft: "100px", flexGrow: "1" }}>
				<div>{children}</div>
			</Box>
		</Box>
	);
}
