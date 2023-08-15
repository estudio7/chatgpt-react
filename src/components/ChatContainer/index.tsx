import React, { useCallback, useEffect, useRef, useState } from "react";
import { Message } from "../../types/types";
import styles from "../../styles/Chat.module.css";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import StyledCheckbox from "../StyledCheckbox";
import StyledButton from "../StyledButton";
import AutocompleteSection from "./AutocompleteSection";
import {
	TextField,
	IconButton,
	InputAdornment,
	Button,
	Box,
	Autocomplete,
} from "@mui/material";
import ReactHtmlParser from "html-react-parser";
import BouncingDotsLoader from "../loader";

interface CheckboxState {
	[option: string]: boolean;
}

interface ChatContainerProps {
	style?: React.CSSProperties;
	messages: Message[];
	handleSendMessage: (
		message: string,
		role: "You" | "KapAdvisor",
		type:
			| "single-select"
			| "free-text"
			| "autocomplete"
			| "multiple-selection"
			| "another1"
			| "another2"
	) => void;
	selectionOptions: string[];
	handleSelection: (option: string) => void;
	handleMultipleSelectionChange: (option: string) => void;
	handleDone: () => void;
	tempMultipleSelections: string[];
	newMessage: string;
	setNewMessage: (newMessage: string) => void;
	sending: boolean;
	universities: any[];
	courseOption: any[];
	handleAutoCompleteSelection: (option: string) => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
	messages,
	handleSendMessage,
	handleSelection,
	handleMultipleSelectionChange,
	handleDone,
	newMessage,
	setNewMessage,
	selectionOptions,
	universities,
	courseOption,
	handleAutoCompleteSelection,
}) => {
	const [waitingForResponse, setWaitingForResponse] = useState(true);
	const [numMessages, setNumMessages] = useState(messages.length);
	const [selectedValues, setSelectedValues] = useState("");
	const [checkboxState, setCheckboxState] = useState<CheckboxState>({});
	const [selectedOption, setSelectedOption] = useState<any>([]);
	const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [lastRenderedMessageIndex, setLastRenderedMessageIndex] = useState(0);
	const [pendingMessages, setPendingMessages] = useState<Message[]>([]);

	const handleDoneClick = () => {
		handleDone();
		setSelectedValues("");
	};

	const handleCheckboxChange = (option: string) => {
		setCheckboxState((prevState) => ({
			...prevState,
			[option]: !prevState[option],
		}));

		handleMultipleSelectionChange(option);
	};

	const checkIsScrolledToBottom = () => {
		if (messagesEndRef.current) {
			const { scrollHeight, scrollTop, clientHeight } = messagesEndRef.current;
			const isAtBottom = scrollHeight - scrollTop === clientHeight;
			return isAtBottom;
		}
		return true;
	};

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
			setTimeout(() => {
				if (messagesEndRef.current) {
					messagesEndRef.current.scrollIntoView({
						behavior: "smooth",
						block: "start",
					});
				}
			}, 1000);
		}
	}, [messages]);

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const [lastMessage, setLastMessage] = useState("");
	const [multipleSelectionActive, setMultipleSelectionActive] = useState(false);

	useEffect(() => {
		setMultipleSelectionActive(selectionOptions.length > 0);
	}, [selectionOptions]);
	const handleKeyDown = (event: any) => {
		if (event.key === "Enter") {
			event.preventDefault();
			submitForm(event);
		}
	};

	// Monitor number of messages
	useEffect(() => {
		if (messages.length > numMessages) {
			setNumMessages(messages.length);
			const lastMessage = messages[messages.length - 1];
			if (lastMessage.role === "KapAdvisor") {
				setWaitingForResponse(true);
				setTimeout(() => {
					setWaitingForResponse(false);
					checkIsScrolledToBottom();
				}, 1000);
			}
		}
	}, [messages, numMessages]);

	const handleAutocompleteKeyDown = (event: any) => {
		if (event.key === "Enter") {
			event.preventDefault();
			handleAutoCompleteSelection(selectedValues);
			setSelectedOption([]);
		}
	};

	const submitForm = async (event: any) => {
		event.preventDefault();
		if (
			newMessage.trim() !== "" &&
			selectionOptions.length === 0 &&
			newMessage !== lastMessage
		) {
			setWaitingForResponse(true);

			// Adicione a nova mensagem ao estado pendingMessages
			setPendingMessages([
				...pendingMessages,
				{ content: newMessage, status: "sending", role: "You", msg_id: "0" },
			]);

			try {
				await handleSendMessage(newMessage, "You", "free-text");

				// Após enviar a mensagem com sucesso, atualize seu status para 'sent'
				setPendingMessages(
					pendingMessages.map((message) =>
						message.content === newMessage
							? { ...message, status: "sent" }
							: message
					)
				);
			} catch (error) {
				// Se houver um erro ao enviar a mensagem, atualize seu status para 'error'
				setPendingMessages(
					pendingMessages.map((message) =>
						message.content === newMessage
							? { ...message, status: "error" }
							: message
					)
				);
			}

			setLastMessage(newMessage);
			setNewMessage("");
			setWaitingForResponse(false);
		}
	};

	const isUniversityCourses = () => {
		return universities.length || courseOption.length;
	};

	const getDesiredField = () => {
		if (universities.length) {
			return (
				<AutocompleteSection
					type={"university"}
					options={universities}
					handleAutoCompleteSelection={handleAutoCompleteSelection}
				/>
			);
		}

		if (courseOption.length) {
			return (
				<AutocompleteSection
					type={"courses"}
					options={courseOption}
					handleAutoCompleteSelection={handleAutoCompleteSelection}
				/>
			);
		}
	};

	const showNextMessage = useCallback(() => {
		if (lastRenderedMessageIndex < messages.length) {
			setIsLoading(true);
			const delay = 10 * messages[lastRenderedMessageIndex].content.length;
			setTimeout(() => {
				setLastRenderedMessageIndex(lastRenderedMessageIndex + 1);
				setIsLoading(false);
			}, delay);
		}
	}, [lastRenderedMessageIndex, messages]);

	useEffect(() => {
		if (messages.length > numMessages) {
			setNumMessages(messages.length);
			const lastMessage = messages[messages.length - 1];
			if (lastMessage.role === "KapAdvisor") {
				setWaitingForResponse(true);
				setTimeout(() => {
					setWaitingForResponse(false);
					checkIsScrolledToBottom();
				}, 1000);
			}
		}
	}, [messages, numMessages]);

	useEffect(() => {
		if (currentMessageIndex > 0) {
			showNextMessage();
		} else {
			setCurrentMessageIndex(currentMessageIndex + 1);
		}
		showNextMessage();
	}, [
		currentMessageIndex,
		lastRenderedMessageIndex,
		messages,
		showNextMessage,
	]);

	return (
		<Box>
			<div className={`${styles.scrollbar} ${styles.chatContainer}`}>
				{(() => {
					const lastUserMessageIndex = messages.reduceRight(
						(acc, message, index) => {
							return acc !== -1 || message.role !== "You" ? acc : index;
						},
						-1
					);

					return messages.concat(pendingMessages).map((message, index) => {
						const messageContent =
							index <= lastUserMessageIndex ||
							index <= lastRenderedMessageIndex ? (
								message.content?.trim() !== "" ? (
									ReactHtmlParser(message.content)
								) : null
							) : index === lastRenderedMessageIndex ? (
								isLoading ? (
									<BouncingDotsLoader />
								) : message.content.trim() !== "" ? (
									ReactHtmlParser(message.content)
								) : null
							) : null;

						if (!messageContent) return null;

						return (
							<div
								key={index}
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems:
										message.role === "You" ? "flex-end" : "flex-start",
								}}
							>
								<div
									style={{
										fontSize: "20px",
										padding:
											index === currentMessageIndex && index !== 0
												? "10px 10px"
												: "30px 20px",
									}}
									className={
										message.role === "You"
											? styles.userMessage
											: styles.kapAdvisorMessage
									}
								>
									{message.status === "error" && <div>erorrro</div>}

									{messageContent}
								</div>
								{message.error && (
									<div>
										Oops! Your message wasn&apos;t sent. Please, give it another
										try.
									</div>
								)}
								{message.type === "single-select" && message.complement && (
									<div
										style={{
											display: "flex",
											flexDirection: "row",
											flexWrap: "wrap",
											fontSize: "20px",
										}}
									>
										{message.complement.map((option, index) => (
											<Button
												key={index}
												onClick={() => handleSelection(option)}
												variant='outlined'
												className={styles.selectionButton}
												style={{ margin: "4px" }}
											>
												{option}
											</Button>
										))}
									</div>
								)}
								{message.type === "multiple-selection" &&
									message.complement && (
										<div
											style={{
												display: "flex",
												flexDirection: "row",
												flexWrap: "wrap",
												fontSize: "18px",
											}}
										>
											{message.complement.map((option, index) => (
												<StyledCheckbox
													key={index}
													label={option}
													checked={!!checkboxState[option]}
													onChange={() => handleCheckboxChange(option)}
												/>
											))}
											<StyledButton
												text="I'm Done!"
												onClick={handleDoneClick}
											/>
										</div>
									)}
							</div>
						);
					});
				})()}
				{waitingForResponse && (
					<div
						style={{ fontSize: "20px", padding: "10px 10px", width: 80 }}
						className={styles.kapAdvisorMessage}
					>
						<BouncingDotsLoader />
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>
			<Box
				sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
			>
				<form
					onSubmit={submitForm}
					style={{
						backgroundColor: "#FFFFFF",
						border: "1px solid #C9C9C9",
						borderRadius: "52px",
						position: "fixed",
						bottom: "25px",
						width: "600px",
						maxWidth: "600px",
						display: "flex",
						alignItems: "center",
						padding: "0 20px",
					}}
				>
					{isUniversityCourses() ? (
						getDesiredField()
					) : (
						<TextField
							id='custom-css-outlined-input'
							sx={{
								opacity: ["single-select", "multiple-selection"].includes(
									messages[messages.length - 1]?.type || ""
								)
									? 0.1
									: 1,
								"& .MuiOutlinedInput-root.Mui-focused": {
									"& > fieldset": {
										borderColor: "transparent",
									},
								},
								"& .MuiOutlinedInput-root:hover": {
									"& > fieldset": {
										borderColor: "transparent",
									},
								},
							}}
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							fullWidth
							placeholder='Chat with KapAdvisor'
							disabled={
								multipleSelectionActive ||
								["single-select", "multiple-selection"].includes(
									messages[messages.length - 1]?.type || ""
								)
							}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<EmojiPeopleIcon className={styles.emojiIcon} />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton type='submit' className={styles.icon}>
											<NavigateNextIcon className={styles.icon} />
										</IconButton>
									</InputAdornment>
								),
							}}
							multiline
							minRows={1}
							maxRows={8}
							onKeyDown={handleKeyDown}
						/>
					)}
				</form>
			</Box>
		</Box>
	);
};

export default ChatContainer;
