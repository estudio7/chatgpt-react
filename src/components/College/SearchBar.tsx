import {
	Box,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useCallback, useState } from "react";

const SearchBar = ({
	setFilter,
	appliedFilter,
}: {
	setFilter: any;
	appliedFilter: any;
}) => {
	const [searchStr, setSearchStr] = useState("");

	const handleSearchCollege = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === "Enter") {
				const collegeName = (event.target as HTMLInputElement).value;
				// if there is a value for collegeName
				if (collegeName) {
					setSearchStr(collegeName);
					// check if there is an entry for collegeName
					const oldFilter = appliedFilter.find(
						(d: { type: string }) => d.type === "College Name"
					);
					// if there is an entry for collegeName then update the "val"
					if (oldFilter) {
						setFilter((prevFilter: any) =>
							prevFilter.map((f: { type: string; val: string }) =>
								f.type === "College Name" ? { ...f, val: collegeName } : f
							)
						);
					} else {
						// if there is no entry for collegeName then add a new entry
						setFilter([
							...appliedFilter,
							{ type: "College Name", val: collegeName },
						]);
					}
				} else {
					// Delete entry from appliedFilter if collegeName is empty
					setFilter((prevFilter: any) =>
						prevFilter.filter(
							(d: { type: string }) => d.type !== "College Name"
						)
					);
				}
			}
		},
		[appliedFilter, setFilter]
	);

	const handleClearClick = useCallback(() => {
		setSearchStr("");
		// Delete entry from appliedFilter if collegeName is empty
		setFilter((prevFilter: any) =>
			prevFilter.filter((d: { type: string }) => d.type !== "College Name")
		);
	}, [setFilter]);

	return (
		<Box display='flex' marginTop={2} justifyContent='center'>
			<Grid
				className='styled-grid'
				container
				spacing={4}
				justifyContent='center'
			>
				<Grid item xs={12} lg={12}>
					<TextField
						variant='standard'
						placeholder='Search Colleges'
						value={searchStr}
						onChange={(e) => setSearchStr(e.target.value)}
						sx={{
							width: "100%",
							borderRadius: 20,
						}}
						onKeyUp={handleSearchCollege}
						InputProps={{
							endAdornment: (
								<>
									{searchStr && (
										<InputAdornment
											position='end'
											onClick={handleClearClick}
											sx={{ cursor: "pointer" }}
										>
											{" "}
											<ClearIcon />
										</InputAdornment>
									)}
									<InputAdornment position='end'>
										{""}
										<SearchIcon />
									</InputAdornment>
								</>
							),
						}}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};

export default SearchBar;
