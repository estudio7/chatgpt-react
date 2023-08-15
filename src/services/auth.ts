// src/services/auth.ts
import axios from "axios";
import { AxiosResponse } from "axios";
import { CollegeData } from "../types/types";

export interface CheckUserResponse {
	message: [number, number];
}

export const TOKEN_KEY = "userToken";
export const USER_ID_KEY = "userId";

// Função para verificar se o código está sendo executado no servidor
export const isServer = () => typeof window === "undefined";

// Salvar o token no localStorage
export const saveToken = async (token: string) => {
	if (!isServer()) {
		localStorage.setItem(TOKEN_KEY, token);
		const savedToken = localStorage.getItem(TOKEN_KEY);
	}
};

// Recuperar o token do localStorage
export const getToken = () => {
	let token = null;
	if (!isServer()) {
		token = localStorage.getItem(TOKEN_KEY);
	}
	return token;
};

// Salvar o userId no localStorage
export const saveUserId = (userId: string) => {
	if (!isServer()) {
		localStorage.setItem(USER_ID_KEY, userId);
	}
};

// Recuperar o userId do localStorage
export const getUserId = () => {
	let userId = null;
	if (!isServer()) {
		userId = localStorage.getItem(USER_ID_KEY);
	}
	return userId;
};

// Função para autenticar o usuário
export const authenticate = async (token: string) => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}get_user_id`,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		const userId = response.data.user_id;
		saveUserId(userId);
		return response.data;
	} catch (error) {
		console.error(error);
		return false;
	}
};
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
export const checkUser = async (): Promise<CheckUserResponse | null> => {
	const token = getToken();

	try {
		const response = await requestWithRetry(
			`${process.env.NEXT_PUBLIC_API_URL}checkUser`,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export async function getUserData() {
	try {
		const token = getToken();
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}get_user_id`,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		const userData = response.data;

		if (userData && userData.user_id) {
			saveUserId(userData.user_id);
			return userData;
		} else {
			throw new Error("User data not found");
		}
	} catch (error) {
		console.error("Failed to fetch user data:", error);
		return null;
	}
}

export async function getOnboardingStatus() {
	const token = getToken();
	const url = `${process.env.NEXT_PUBLIC_API_URL}checkPercentage`;
	const options = {
		headers: { Authorization: `Bearer ${token}` },
	};
	try {
		const response = await requestWithRetry(url, options);
		const responseData = response.data;

		return responseData.message;
	} catch (error) {
		console.error("Failed to fetch user info:", error);
		return null;
	}
}

export async function getSuggestedColleges(): Promise<CollegeData[]> {
	const token = getToken();
	const url = `${process.env.NEXT_PUBLIC_API_URL}getSuggestion`;
	const options = {
		headers: { Authorization: `Bearer ${token}` },
	};

	try {
		const response = await requestWithRetry(url, options);
		let responseData = response.data;

		if (typeof responseData === "string") {
			responseData = responseData.replace(/\bNaN\b/g, "null");
			const data = JSON.parse(responseData);
			if (data && data.suggestions.rows) {
				return Object.values(data.suggestions.rows) as CollegeData[];
			}
		}
		return Object.values(responseData.suggestions?.rows) as CollegeData[];
	} catch (error) {
		console.error("Failed to fetch user info:", error);
		return [];
	}
}

export async function getUniversitiesSearch() {
	const token = getToken();
	const url = `${process.env.NEXT_PUBLIC_API_URL}get_universities_search`;
	const options = {
		headers: { Authorization: `Bearer ${token}` },
	};

	try {
		const response = await requestWithRetry(url, options);
		let responseData = response.data;
		// const allData = responseData.universities;
		return responseData;
	} catch (error) {
		console.error("Failed to fetch user info:", error);
		return [];
	}
}

export async function getInfoUser() {
	const token = getToken();
	const url = `${process.env.NEXT_PUBLIC_API_URL}getUserInfo`;
	const options = {
		headers: { Authorization: `Bearer ${token}` },
	};

	try {
		const response = await requestWithRetry(url, options);
		const userInfo = response.data;

		if (userInfo && userInfo.user_id) {
			saveUserId(userInfo.user_id);
			return userInfo;
		} else {
			console.error("User info not found");
			return {};
		}
	} catch (error) {
		console.error("Failed to fetch user info:", error);
		return {};
	}
}

export async function getUniversities() {
	const token = getToken();
	const url = `${process.env.NEXT_PUBLIC_API_URL}get_universities`;
	const options = {
		headers: { Authorization: `Bearer ${token}` },
	};

	try {
		const response = await requestWithRetry(url, options);
		let responseData = response.data;
		return responseData;
	} catch (error) {
		console.error("Failed to fetch user info:", error);
		return [];
	}
}
