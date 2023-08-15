import { getToken } from "../services/auth";

export async function fetchWithToken(url, options = {}) {
	try {
		const token = getToken();
		options.headers = {
			...options.headers,
			Authorization: `Bearer ${token}`,
		};

		const response = await fetch(url, options);

		if (!response || !response.ok) {
			const errorData = await response.json();
			console.log(errorData);
		}

		return response;
	} catch (error) {
		console.log(error);
	}
}
