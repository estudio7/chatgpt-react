import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import MuiInput from "@mui/material/Input";

const Input = styled(MuiInput)`
	border: 1px solid #ddd;
	width: 60px;
	font-size: 12px;
	padding-top: 4px;
	padding-left: 4px;
	height: 20px;
	color: ##5a5a5a;
`;

const StyledSlider = styled(Slider)(({ theme, ...props }) => {
	return {
		color: "rgb(164 143 233)",
		height: 3,
		padding: "13px 0",
		"& .MuiSlider-thumb": {
			height: 15,
			width: 12,
			borderRadius: 0,
			backgroundColor: "#fff",
			border: "1px solid currentColor",
			"&:hover": {
				boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
			},
		},
		"& .MuiSlider-track": {
			height: 3,
		},
		"& .MuiSlider-mark": {
			backgroundColor: "transparent",
		},
		"& .MuiSlider-rail": {
			color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
			opacity: theme.palette.mode === "dark" ? undefined : 1,
			height: 3,
		},
	};
});

const RangeSlider = ({
	label,
	min,
	max,
	step,
	defaultValue,
	handleChange,
	labelStyle,
}: {
	label: string;
	min: number;
	max: number;
	step: number;
	defaultValue: [number, number];
	handleChange: (value: number | number[]) => void;
	labelStyle?: {};
}) => {
	const [value, setValue] = useState([min, max]);

	const handleInputChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = [Number(event.target.value), value[1]];
		setValue(newValue);
	};

	const handleInputChangeMax = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = [value[0], Number(event.target.value)];
		setValue(newValue);
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column" }}>
			<Box
				sx={{
					display: "flex",
					gap: "10px",
					alignItems: "center",
					justifyContent: "stretch",
					height: "22px",
				}}
			>
				<Typography
					gutterBottom
					variant='overline'
					sx={{
						lineHeight: "1rem",
						fontSize: "10px",
						minWidth: "35px",
						...labelStyle,
					}}
				>
					{label}
				</Typography>
				<StyledSlider
					value={value}
					marks
					max={max}
					step={step}
					min={min}
					size='medium'
					valueLabelDisplay='auto'
					onChange={(_, newValue) => {
						setValue(newValue as [number, number]);
						handleChange(newValue as [number, number]);
					}}
				/>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					marginBottom: "20px",
					paddingLeft: "45px",
				}}
			>
				<Box sx={{ display: "flex" }}>
					<Input
						value={value[0]}
						size='small'
						disableUnderline={true}
						onChange={handleInputChangeMin}
						inputProps={{
							step,
							min,
							max,
							type: "number",
							"aria-labelledby": "input-slider",
						}}
					/>
				</Box>
				<Box sx={{ display: "flex" }}>
					<Input
						value={value[1]}
						size='small'
						disableUnderline={true}
						onChange={handleInputChangeMax}
						inputProps={{
							step,
							min,
							max,
							type: "number",
							"aria-labelledby": "input-slider",
						}}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default RangeSlider;
