import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import SliderSection from "./SliderSection";
import CheckboxSection from "./CheckboxSection";
import LegendSection from "./LegendSection";
import StateSelector from "./StateSelector";

export const FilterPanel = ({
	setFilter,
	appliedFilter,
	maxTuitionFees,
}: {
	setFilter: any;
	appliedFilter: any;
	maxTuitionFees: { maxTuition2: number; maxTuition3: number };
}) => {
	const [filterType, setFilterType] = useState<
		Array<{
			type: string;
			val: number[] | string;
		}>
	>([]);

	const [selectedPublic, setSelectedPublic] = useState(false);
	const [selectedPrivate, setSelectedPrivate] = useState(false);
	const [state, setState] = useState("");

	const handleCheckboxChange = (type: string, value: boolean) => {
		if (type.toLowerCase() === "public") {
			setSelectedPublic(value);
		} else if (type.toLowerCase() === "private") {
			setSelectedPrivate(value);
		}
	};

	const handleSliderFilter = ({
		type,
		val,
		min,
		max,
	}: {
		type: string;
		val: number[];
		min: number;
		max: number;
	}) => {
		console.log({ type, val });
		if (type === "Acc_rate") val = [val[0] / 100, val[1] / 100];
		const existingFilter = filterType.find((filter) => filter.type === type);

		// If the filter with the given type already exists, update its value; otherwise, add a new filter
		if (existingFilter) {
			const updatedFilter = { ...existingFilter, val };

			// Check if val is [min, max], if so, remove the filter
			if (val[0] === min && val[1] === max) {
				setFilterType(filterType.filter((filter) => filter.type !== type));
			} else {
				// check "type" and update "val" by using "setFilterType"
				setFilterType(
					filterType.map((filter) =>
						filter.type === type ? updatedFilter : filter
					)
				);
			}
		} else {
			// Add a new filter
			setFilterType([...filterType, { type, val }]);
		}
	};

	// apply filter for "Type"
	useEffect(() => {
		if (selectedPublic && !selectedPrivate) {
			// Check if the filter with type "type" already exists
			const existingFilter = filterType?.find(
				(filter) => filter.type === "type"
			);
			if (existingFilter) {
				// Update the val to "public" if it already exists
				setFilterType((prevFilterType) =>
					prevFilterType?.map((filter) =>
						filter.type === "type" ? { ...filter, val: "public" } : filter
					)
				);
			} else {
				// Add a new filter entry for "type" if it doesn't exist
				setFilterType((prevFilterType) => [
					...(prevFilterType || []),
					{ type: "type", val: "public" },
				]);
			}
		} else if (!selectedPublic && selectedPrivate) {
			// Check if the filter with type "type" already exists
			const existingFilter = filterType?.find(
				(filter) => filter.type === "type"
			);
			if (existingFilter) {
				// Update the val to "private" if it already exists
				setFilterType((prevFilterType) =>
					prevFilterType?.map((filter) =>
						filter.type === "type" ? { ...filter, val: "private" } : filter
					)
				);
			} else {
				// Add a new filter entry for "type" if it doesn't exist
				setFilterType((prevFilterType) => [
					...(prevFilterType || []),
					{ type: "type", val: "private" },
				]);
			}
		} else {
			// Remove the filter entry with type "type" if it exists
			setFilterType((prevFilterType) =>
				prevFilterType?.filter((filter) => filter.type !== "type")
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedPublic, selectedPrivate]);
	// apply filter for slider elements
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setFilter([...filterType]);
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [filterType, setFilter]);

	useEffect(() => {
		if (!state || state.length === 0) {
			setFilterType(() =>
				filterType.filter((filter) => filter.type !== "state")
			);
			return;
		}
		const existingStateFilter = filterType.find(
			(filter) => filter.type === "state"
		);
		if (!existingStateFilter) {
			// Add a new filter
			setFilterType([...filterType, { type: "state", val: state }]);
		} else {
			setFilterType(
				filterType.map((filter) =>
					filter.type === "state" ? { type: "state", val: state } : filter
				)
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setFilterType, state]);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "stretch",
				color: "#5d5d5d",
			}}
		>
			<Typography variant='caption' sx={{ fontSize: "14px" }}>
				SEARCH FILTERS
			</Typography>
			<Box sx={{ flex: 1, paddingTop: "10px", marginTop: "18px" }}>
				<StateSelector setState={setState} />
			</Box>
			<Box
				sx={{
					display: "flex",
					marginBottom: "20px",
					marginTop: "30px",
					justifyContent: "flex-start",
					gap: "25px",
				}}
			>
				<CheckboxSection
					label='PRIVATE'
					value={selectedPrivate}
					onChange={(value) => handleCheckboxChange("private", value)}
				/>
				<CheckboxSection
					label='PUBLIC'
					value={selectedPublic}
					onChange={(value) => handleCheckboxChange("public", value)}
				/>
			</Box>

			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					marginBottom: "15px",
					marginTop: "10px",
				}}
			>
				<Typography variant='body2' sx={{ fontSize: "10px" }}>
					SCORES
				</Typography>
				<Divider sx={{ flex: 1 }} />
			</Box>
			<SliderSection
				max={4}
				step={0.5}
				min={0}
				defaultValue={[0, 4]}
				label='GPA'
				onChange={(val: any) =>
					handleSliderFilter({ type: "GPA Score", val, min: 0, max: 4 })
				}
			/>
			<SliderSection
				max={1600}
				step={50}
				min={0}
				defaultValue={[0, 1600]}
				label='SAT'
				onChange={(val: any) =>
					handleSliderFilter({ type: "SAT Score", val, min: 0, max: 1600 })
				}
			/>
			<SliderSection
				max={36}
				step={1}
				min={0}
				defaultValue={[0, 36]}
				label='ACT'
				onChange={(val: any) =>
					handleSliderFilter({ type: "ACT Score", val, min: 0, max: 36 })
				}
			/>

			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					marginBottom: "15px",
					marginTop: "10px",
				}}
			>
				<Typography variant='body2' sx={{ fontSize: "10px" }}>
					ACCEPTANCE RATE
				</Typography>
				<Divider sx={{ flex: 1 }} />
			</Box>
			<SliderSection
				max={100}
				step={1}
				min={0}
				defaultValue={[0, 1]}
				label=''
				onChange={(val: any) =>
					handleSliderFilter({ type: "Acc_rate", val, min: 0, max: 1 })
				}
			/>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					marginBottom: "20px",
					marginTop: "10px",
				}}
			>
				<Typography variant='body2' sx={{ fontSize: "10px" }}>
					TUITION ($K)
				</Typography>
				<Divider sx={{ flex: 1 }} />
			</Box>
			{maxTuitionFees.maxTuition2 && (
				<SliderSection
					defaultValue={[0, 20]}
					max={maxTuitionFees.maxTuition2}
					step={1}
					min={0}
					label='IN STATE'
					onChange={(val: any) =>
						handleSliderFilter({
							type: "tuition2",
							val,
							min: 0,
							max: maxTuitionFees.maxTuition2,
						})
					}
				/>
			)}
			{maxTuitionFees.maxTuition3 && (
				<SliderSection
					defaultValue={[0, 20]}
					max={maxTuitionFees.maxTuition3}
					step={1}
					min={0}
					label='OUT OF STATE'
					onChange={(val: any) =>
						handleSliderFilter({
							type: "tuition3",
							val,
							min: 0,
							max: maxTuitionFees.maxTuition3,
						})
					}
				/>
			)}

			<LegendSection />
		</Box>
	);
};
