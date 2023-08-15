// components/styles.ts
import styled from "@emotion/styled";
import { Link, ListItem } from "@mui/material";

export const StyledListItem = styled(ListItem)(({ width }: { width: any }) => ({
	marginBottom: "10px",
	".menuBtn": {
		display: "flex",
		flexDirection: "column",
		transition: "all 0.05s",
		paddingTop: "20px",
		paddingBottom: "20px",
	},
	".menuLabel": {
		textWrap: "nowrap",
		overflow: "hidden",
		span: { fontSize: "16px" },
	},
	".menuIconCnt": {
		minWidth: "auto",
	},
	"&:hover": {
		".menuBtn": {
			color: "#240F6E",
			maxWidth: width - 20 + "px",
			backgroundColor: "#ffffff",
			borderTopRightRadius: "20px",
			borderBottomRightRadius: "20px",
			boxShadow:
				"rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
			paddingLeft: "0",
			".menuIcon": {
				color: "#240F6E",
			},
			".menuLabel": {
				color: "#240F6E",
				fontWeight: "700",
			},
		},
	},
}));
