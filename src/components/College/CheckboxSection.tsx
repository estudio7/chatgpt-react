import { Box, Checkbox, Typography } from "@mui/material";
import React, { useCallback } from "react";

interface CheckboxSectionProps {
	label: string;
	value: boolean;
	onChange: (value: boolean) => void;
}

const CheckboxSection: React.FC<CheckboxSectionProps> = ({
	label,
	value,
	onChange,
}) => {
	const handleCheckboxChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			onChange(e.target.checked);
		},
		[onChange]
	);

	return (
		<Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
			<Typography variant='body2' sx={{ fontSize: "10px" }}>
				{label}
			</Typography>
			<Checkbox
				sx={{
					margin: "0",
					padding: 0,
					color: "#999",
					"&.Mui-checked": {
						color: "green",
					},
				}}
				checked={value}
				onChange={handleCheckboxChange}
			/>
		</Box>
	);
};

export default CheckboxSection;
