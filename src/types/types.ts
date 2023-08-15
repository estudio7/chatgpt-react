//src/types/types.ts
export interface CollegeData {
	"ACT Score": number;
	ACT_flag: number;
	ACT_flag_color: string;
	"Acceptance Rate": number;
	"Acceptance probability": string;
	"College Name": string;
	"GPA Score": number;
	GPA_flag: number;
	GPA_flag_color: string;
	"SAT Score": number;
	SAT_flag: number;
	SAT_flag_color: string;
	is_favorite: number; // Updated to match JSON data
	university_id: number; // Updated to match JSON data
	id?: string; // Optional as it does not appear in the provided JSON data
	city?: string;
	Acc_rate?: number;
	webaddr?: string;
	size?: number;
	tuition?: number;
	stabbr?: string;
	tuition2?: string;
	tuition3?: string;
	type?: string;
	index?: any;
}

export interface UniversityData {
	ac_rate: number;
	act_avg: number;
	actcm25: number;
	admssn: number;
	applcn: number;
	city: string;
	gpa_avg: number;
	index: number;
	instnm: string;
	sat_avg: number;
	satmt25: number;
	satmt75: number;
	satvr25: number;
	stabbr: string;
	tuition2: number;
	tuition3: number;
	webaddr: string;
}

export interface UserData {
	act_score: string | null;
	ap_classes: string | null;
	carrer: string | null;
	ext_act: string | null;
	f_contri: string | null;
	flag: number;
	gpa_score: string | null;
	sat_score: string | null;
	university: string | null;
	user_id: number;
}

export interface Message {
	complement?: string[] | null;
	content: string;
	msg_id: any;
	role?: "You" | "KapAdvisor";
	type?:
		| "single-select"
		| "free-text"
		| "autocomplete"
		| "multiple-selection"
		| "another1"
		| "another2"
		| "autocomplete-1";
	error?: any;
	status?: any;
}

export interface CheckUserResponse {
	message: number;
}
