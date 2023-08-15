import Box from "@mui/material/Box";
import Slider from "../Slider";
import React from "react";

interface SliderSectionProps {
	label: string;
	defaultValue: [number, number];
	max: number;
	min: number;
	step: number;
	onChange: (val: number | number[]) => void;
}

const SliderSection: React.FC<SliderSectionProps> = ({
	label,
	defaultValue,
	max,
	min,
	step,
	onChange,
}) => {
	return (
		<Box>
			<Slider
				max={max}
				step={step}
				min={min}
				defaultValue={defaultValue}
				label={label}
				handleChange={onChange}
			/>
		</Box>
	);
};

export default SliderSection;
