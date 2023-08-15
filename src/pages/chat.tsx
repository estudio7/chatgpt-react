import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { getToken } from "../services/auth";
import { Message } from "../types/types";
import { AxiosResponse } from "axios";

import ChatContainer from "../components/ChatContainer";
import { Container, Box, Grid, AppBar, Toolbar } from "@mui/material";
import styles from "../styles/Chat.module.css";
import NavBar from "../components/NavBar/index";
import { checkUser } from "../services/auth";
type MessageType =
	| "single-select"
	| "free-text"
	| "autocomplete"
	| "multiple-selection"
	| "another1"
	| "another2";

const requestWithRetry = async (
	url: string,
	options: any,
	retryCount: number = 0
): Promise<AxiosResponse> => {
	try {
		const response = await axios(url, options);
		if (response.status === 200) {
			return response;
		}
		throw new Error("Request failed");
	} catch (error) {
		if (retryCount >= 3) {
			throw error;
		}
		await new Promise((resolve) => setTimeout(resolve, 500));
		return requestWithRetry(url, options, retryCount + 1);
	}
};

const Chat: React.FC = () => {
	const messages = useRef<Message[]>([]);
	const [newMessage, setNewMessage] = useState("");
	const [lastMessageId, setLastMessageId] = useState<number | null>(null);
	const [selectionOptions, setSelectionOptions] = useState<string[]>([]);
	const [multipleSelections, setMultipleSelections] = useState<string[]>([]);
	const [lock, setLock] = useState(false);
	const [tempMultipleSelections, setTempMultipleSelections] = useState<
		string[]
	>([]);
	const [pendingMessage, setPendingMessage] = useState<{
		message: string;
		role: "You" | "KapAdvisor";
		type: MessageType | null;
	} | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const [sending, setSending] = useState(false);

	const [universities, setUniversities] = useState<any[]>([]);
	const [courseOption, setCourseOption] = useState<any[]>([]);

	const loadMessages = useCallback(async () => {
		const token = getToken();
		try {
			const response = await requestWithRetry(
				`${process.env.NEXT_PUBLIC_API_URL}loadMessages`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.data.length > 0) {
				const newMessages = response.data.filter((message: Message) =>
					lastMessageId !== null ? message.msg_id > lastMessageId : true
				);
				newMessages.forEach((newMessage: Message) => {
					if (!messages.current.some((m) => m.msg_id === newMessage.msg_id)) {
						messages.current = [...messages.current, newMessage];
					}
				});

				const maxId = Math.max(
					...response.data.map((message: Message) => message.msg_id)
				);
				if (maxId > (lastMessageId || 0)) {
					setLastMessageId(maxId);
				}

				const lastMessage = response.data[response.data.length - 1];
				if (
					lastMessage.role === "KapAdvisor" &&
					lastMessage.type === "single-select"
				) {
					setSelectionOptions(lastMessage.complement || []);
				} else {
					setSelectionOptions([]);
				}

				//api calling for universities
				let ap = lastMessage.type.includes("autocomplete");
				if (
					(ap && lastMessage.content.toLowerCase().includes("schools")) ||
					(ap && lastMessage.content.toLowerCase().includes("colleges")) ||
					(ap && lastMessage.content.toLowerCase().includes("universities")) ||
					(ap && lastMessage.content.toLowerCase().includes("university")) ||
					(ap && lastMessage.content.toLowerCase().includes("college")) ||
					(ap && lastMessage.content.toLowerCase().includes("school"))
				) {
					const response = await axios.get(
						`${process.env.NEXT_PUBLIC_API_URL}get_universities`,
						{
							headers: { Authorization: `Bearer ${token}` },
						}
					);
					setUniversities(response?.data?.universities);
				} else {
					setUniversities([]);
				}

				//api calling for courses
				if (
					(lastMessage.type.includes("autocomplete") &&
						lastMessage.content.toLowerCase().includes("courses")) ||
					(lastMessage.type.includes("autocomplete") &&
						lastMessage.content.toLowerCase().includes("classes"))
				) {
					console.log("courses api to be called here !");
					const response = await axios.get(
						`${process.env.NEXT_PUBLIC_API_URL}get_ap_courses`,
						{
							headers: { Authorization: `Bearer ${token}` },
						}
					);
					// console.log(response?.data);
					setCourseOption(response?.data?.courses);
				} else {
					setCourseOption([]);
				}
			}
		} catch (error) {
			console.error("Erro ao carregar as mensagens: ", error);
		}
	}, [lastMessageId]);

	const messagesEndRef = useRef<HTMLDivElement>(null);

	const handleSelection = (option: string) => {
		setSelectionOptions([]);
		setPendingMessage({ message: option, role: "You", type: "free-text" });
	};

	const handleMultipleSelectionChange = (option: string) => {
		setTempMultipleSelections((prev) => {
			const newSelections = prev.includes(option)
				? prev.filter((selection) => selection !== option)
				: [...prev, option];
			if (newSelections.length === 0) {
				return prev;
			}
			return newSelections;
		});
	};

	const handleDone = () => {
		setMultipleSelections(tempMultipleSelections);
		setTempMultipleSelections([]);
	};

	useEffect(() => {
		if (multipleSelections.join(", ").trim() !== "") {
			setPendingMessage({
				message: multipleSelections.join(", "),
				role: "You",
				type: "free-text",
			});
		}
	}, [multipleSelections]);

	const sendMessage = useCallback(
		async (
			message: string,
			role: "You" | "KapAdvisor",
			type: MessageType | null
		) => {
			if (message.trim() === "" || sending || lock) return;
			setLock(true);
			setSending(true);

			if (lastMessageId === null) {
				console.error("Error: The last message ID is null");
				setLock(false);
				return;
			}

			const token = getToken();
			let attempt = 0;
			let successful = false;

			while (attempt < 3 && !successful) {
				attempt++;
				try {
					const response = await requestWithRetry(
						`${process.env.NEXT_PUBLIC_API_URL}sendMessageJson`,
						{
							headers: { Authorization: `Bearer ${token}` },
							method: "post",
							data: { message },
						}
					);

					if (response.status === 200) {
						const newMessage = {
							complement: null,
							content: `<p>${message}</p>`,
							msg_id: lastMessageId + 1,
							role: role,
							type: type || "free-text",
						};

						if (!messages.current.some((m) => m.msg_id === newMessage.msg_id)) {
							messages.current = [...messages.current, newMessage];
							setLastMessageId(lastMessageId + 1);
						}

						setNewMessage("");
						if (inputRef.current) {
							inputRef.current.value = "";
						}
						loadMessages();
						checkUser();
						setSending(false);
						successful = true;
					}
				} catch (error) {
					// Don't log any errors or set error states here
				}
			}

			if (!successful) {
				setSending(false);
			}

			setLock(false);
		},
		[lastMessageId, loadMessages, lock, sending]
	);

	useEffect(() => {
		if (pendingMessage) {
			sendMessage(
				pendingMessage.message,
				pendingMessage.role,
				pendingMessage.type
			);
			setPendingMessage(null);
		}
	}, [pendingMessage, sendMessage]);

	useEffect(() => {
		loadMessages();
		// const intervalId = setInterval(() => {
		//   loadMessages();
		// }, 3000);
		// return () => clearInterval(intervalId);
	}, [loadMessages]);

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	const handleAutoCompleteSelection = (option: string | null) => {
		if (option != null) {
			setPendingMessage({ message: option, role: "You", type: "free-text" });
		}
	};

	return (
		<NavBar>
			<Container className={styles.container} disableGutters>
				<Grid container>
					<Grid item lg={12}>
						<Box className={styles.chatBox}>
							<ChatContainer
								messages={messages.current}
								handleSelection={handleSelection}
								handleMultipleSelectionChange={handleMultipleSelectionChange}
								handleDone={handleDone}
								selectionOptions={selectionOptions}
								tempMultipleSelections={tempMultipleSelections}
								handleSendMessage={sendMessage}
								newMessage={newMessage}
								setNewMessage={setNewMessage}
								sending={sending}
								handleAutoCompleteSelection={handleAutoCompleteSelection}
								universities={universities}
								courseOption={courseOption}
							/>
							<div ref={messagesEndRef} />
						</Box>
					</Grid>
				</Grid>
			</Container>
		</NavBar>
	);
};

export default Chat;
