import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Checkbox,
} from "@mui/material";
import { useEffect, useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

interface CustomSelectProps {
	value: any;
	onChange: (value: string | string[]) => void;
	states: Array<{ name: string; abbreviation: string }>;
}

const CustomSelect = ({ value, onChange, states }: CustomSelectProps) => {
	const [filteredStates, setFilteredStates] = useState(states);

	const handleChange = (event: SelectChangeEvent<{ value: unknown }>) => {
		const selectedValues = event.target.value as unknown;
		const selectedArray = Array.isArray(selectedValues)
			? selectedValues
			: [selectedValues as string];
		onChange(selectedArray);
	};

	useEffect(() => {
		setFilteredStates(states);
	}, [states]);

	return (
		<div>
			<FormControl sx={{ width: "100%" }}>
				<InputLabel
					id='demo-multiple-name-label'
					sx={{ fontSize: "16px", top: "-10px" }}
				>
					State
				</InputLabel>
				<Select
					labelId='demo-multiple-name-label'
					id='demo-multiple-name'
					multiple
					value={value}
					onChange={handleChange}
					input={<OutlinedInput label='State' />}
					variant='outlined'
					sx={{
						height: "35px",
						"& .MuiSelect-select": {
							fontSize: "14px",
						},
						"& .MuiMenuItem-gutters": {
							fontSize: "16px",
						},
						"& .MuiSelect-root": {
							padding: "4px 10px",
							fontSize: "12px",
						},
						border: "1px solid #ccc",
					}}
				>
					{filteredStates.map((state) => (
						<MenuItem
							key={state.abbreviation}
							value={state.abbreviation}
							sx={{
								fontSize: "14px",
								display: "flex",
								justifyContent: "space-between", // Add this to align checkbox to the right
								alignItems: "center", // Add this for vertical alignment
							}}
							selected={
								typeof value === "string"
									? value === state.abbreviation
									: value.includes(state.abbreviation)
							}
						>
							{state.name}
							<Checkbox
								checked={
									typeof value === "string"
										? value === state.abbreviation
										: value.includes(state.abbreviation)
								}
							/>
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};

const StateSelector = ({ setState }: { setState: any }) => {
	const [stateName, setStateName] = useState<string[]>([]);
	const [states, setStates] = useState<
		Array<{ name: string; abbreviation: string }>
	>([]);

	useEffect(() => {
		fetch("./states.json")
			.then((response) => response.json())
			.then((data) => {
				setStates(data);
			})
			.catch((error) => console.error("Error fetching states:", error));
	}, []);

	return (
		<CustomSelect
			value={stateName}
			onChange={(value: any) => {
				setStateName(value);
				setState(value);
			}}
			states={states}
		/>
	);
};

export default StateSelector;
