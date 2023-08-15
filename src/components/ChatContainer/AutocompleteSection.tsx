import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListSubheader from "@mui/material/ListSubheader";
import Popper from "@mui/material/Popper";
import { useTheme, styled } from "@mui/material/styles";
import { VariableSizeList, ListChildComponentProps } from "react-window";
import Typography from "@mui/material/Typography";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRef, useState } from "react";
import styles from "../../styles/Chat.module.css";

import { Box, IconButton } from "@mui/material";

const LISTBOX_PADDING = 8;

function renderRow(props: ListChildComponentProps) {
	const { data, index, style } = props;
	const dataSet = data[index];
	const inlineStyle = {
		...style,
		top: (style.top as number) + LISTBOX_PADDING,
	};

	if (dataSet.hasOwnProperty("group")) {
		return (
			<ListSubheader key={dataSet.key} component='div' style={inlineStyle}>
				{dataSet.group}
			</ListSubheader>
		);
	}

	return (
		<Typography component='li' {...dataSet[0]} noWrap style={inlineStyle}>
			{dataSet[1]}
		</Typography>
	);
}

const OuterElementContext = React.createContext({});

// eslint-disable-next-line react/display-name
const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
	const outerProps = React.useContext(OuterElementContext);
	return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
	const ref = React.useRef<VariableSizeList>(null);
	React.useEffect(() => {
		if (ref.current != null) {
			ref.current.resetAfterIndex(0, true);
		}
	}, [data]);
	return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
	const { children, ...other } = props;
	const itemData: React.ReactChild[] = [];
	(children as React.ReactChild[]).forEach(
		(item: React.ReactChild & { children?: React.ReactChild[] }) => {
			itemData.push(item);
			itemData.push(...(item.children || []));
		}
	);

	const theme = useTheme();
	const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
		noSsr: true,
	});
	const itemCount = itemData.length;
	const itemSize = smUp ? 36 : 48;

	const getChildSize = (child: React.ReactChild) => {
		if (child.hasOwnProperty("group")) {
			return 48;
		}

		return itemSize;
	};

	const getHeight = () => {
		if (itemCount > 8) {
			return 8 * itemSize;
		}
		return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
	};

	const gridRef = useResetCache(itemCount);

	return (
		<Box ref={ref}>
			<OuterElementContext.Provider value={other}>
				<VariableSizeList
					itemData={itemData}
					height={getHeight() + 2 * LISTBOX_PADDING}
					width='100%'
					ref={gridRef}
					outerElementType={OuterElementType}
					innerElementType='ul'
					itemSize={(index) => getChildSize(itemData[index])}
					overscanCount={5}
					itemCount={itemCount}
				>
					{renderRow}
				</VariableSizeList>
			</OuterElementContext.Provider>
		</Box>
	);
});

const StyledPopper = styled(Popper)({
	borderRadius: "20px",
	border: "1px solid #190755",
	// marginBottom: "20px",
	overflow: "hidden",
	[`& .${autocompleteClasses.listbox}`]: {
		boxSizing: "border-box",
		"& ul": {
			padding: 0,
			margin: 0,
			"& li": {
				fontSize: "16px",
				color: "#190755",
				fontWeight: "normal",
				padding: "15px 10px",
			},
		},
	},
});

const optionName = ({ type, option }: { type: string; option: any }): string =>
	type === "university" ? option["instnm"] : option;

export default function AutoCompleteSelection({
	type,
	handleAutoCompleteSelection,
	options,
}: {
	type: string;
	handleAutoCompleteSelection: any;
	options: any[];
}) {
	const [selectedOption, setSelectedOption] = useState([]);

	const autocompleteRef = useRef(null);

	// const handleClosePopper = () => {
	// 	if (autocompleteRef.current) {
	// 		autocompleteRef.current.closePopup();
	// 	}
	// };

	const handleKeyDown = (event: any) => {
		if (event.key === "Enter") {
			event.preventDefault();
			event.stopPropagation();
			saveSelectedOption();
		}
	};

	const handleChangeEvent = (_: any, value: any) => {
		setSelectedOption(value);
	};

	const saveSelectedOption = () => {
		setSelectedOption([]);
		handleAutoCompleteSelection(
			selectedOption.map((option) => optionName({ type, option })).join(", ")
		);
		console.log({ selectedOption });
		// handleClosePopper();
	};

	return (
		<>
			<EmojiPeopleIcon className={styles.emojiIcon} />
			<Autocomplete
				ref={autocompleteRef}
				multiple
				disableCloseOnSelect={true}
				filterSelectedOptions={true}
				fullWidth
				popupIcon={""}
				disableListWrap
				PopperComponent={StyledPopper}
				ListboxComponent={ListboxComponent}
				options={options}
				value={selectedOption}
				getOptionLabel={(option: any) => optionName({ type, option })} // <-- Modify this line
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder={
							type === "university" ? "Select University" : "Select Course"
						}
						onKeyDown={handleKeyDown}
					/>
				)}
				renderOption={(props, option, state) =>
					[props, optionName({ type, option }), state.index] as React.ReactNode
				}
				renderGroup={(params) => params as unknown as React.ReactNode}
				onChange={handleChangeEvent}
				sx={{
					borderRadius: "50px",
					"& .MuiInputBase-root.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
						{
							border: 0,
						},
				}}
			/>
			<IconButton className={styles.icon} onClick={saveSelectedOption}>
				<NavigateNextIcon className={styles.icon} />
			</IconButton>
		</>
	);
}
