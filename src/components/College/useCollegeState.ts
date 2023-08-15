import React, { useCallback, useEffect, useState } from "react";
import { CollegeData } from "../../types/types";
import {
	getInfoUser,
	getOnboardingStatus,
	getSuggestedColleges,
} from "../../services/auth";
import { getUniversitiesSearch } from "../../services/auth";

const addFields = (college: any) => {
	college["ACT Score"] = college.act_avg;
	college["Acceptance Rate"] = college.ac_rate?.toFixed(3);
	college["GPA Score"] = college.gpa_avg;
	college["SAT Score"] = college.sat_avg;
	college["Acc_rate"] = college.ac_rate;
	college["College Name"] = college.instnm;
	college["university_id"] = college.index;
	// Convert tuition2 and tuition3 to string
	college.tuition2 = String(college.tuition2);
	college.tuition3 = String(college.tuition3);
	return college;
};

const fetchData = async () => {
	try {
		const userData = await getInfoUser();
		const allCollegesData = await getUniversitiesSearch();
		const suggestedColleges = await getSuggestedColleges();

		const updatedColleges = allCollegesData?.universities?.map(addFields) || [];

		return { userData, updatedColleges, suggestedColleges };
	} catch (error) {
		console.error(`Fetch failed: ${error}`);
		return { userData: null, updatedColleges: [], suggestedColleges: [] };
	}
};

const filterData = (data: CollegeData[], appliedFilter: any[]) => {
	if (appliedFilter.length <= 0) {
		return data;
	}

	return data.filter((item: any) => {
		return appliedFilter.every((filter) => {
			const { type, val } = filter;
			if (!val) return false;
			let value = item[type];

			if (type === "type") {
				if (val === "all") {
					return true;
				}
				return value.toLowerCase() === val.toLowerCase();
			}

			if (type === "state") {
				return val.includes(item["stabbr"]);
			}

			if (type === "College Name") {
				return item["College Name"].toLowerCase().includes(val.toLowerCase());
			}

			if (typeof value === "string" && !isNaN(Number(value))) {
				value = Number(value);
			}

			if (["tuition2", "tuition3"].includes(type)) {
				return value >= val[0] * 1000 && value <= val[1] * 1000;
			}

			return value >= val[0] && value <= val[1];
		});
	});
};

const useCollegeState = () => {
	const [onboardingStatus, setOnboardingStatus] = useState("");
	const [universities, setUniversities] = useState<CollegeData[]>([]);
	const [allColleges, setColleges] = useState<CollegeData[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [appliedFilter, setFilter] = useState([]);
	const [userData, setUserData] = useState(null);
	const [suggestedColleges, setSuggestedColleges] = useState<CollegeData[]>([]);
	const [maxTuitionFees, setMaxTuitionFees] = useState({
		maxTuition2: 20,
		maxTuition3: 20,
	});

	const handleFavoriteToggle = useCallback(
		(college: CollegeData) => {
			setColleges((prevColleges) =>
				prevColleges.map((d) =>
					d.index === college.index
						? { ...addFields(d), is_favorite: college.is_favorite }
						: addFields(d)
				)
			);
		},
		[setColleges]
	);

	const handleChange = (_: any, value: number) => {
		setPage(value);
	};

	useEffect(() => {
		fetchData().then(({ userData, updatedColleges, suggestedColleges }) => {
			setUserData(userData);
			setUniversities(updatedColleges);
			setColleges(updatedColleges);
			setSuggestedColleges(suggestedColleges);
			setIsLoading(false);
		});
	}, []);

	useEffect(() => {
		const filteredColleges = filterData(universities, appliedFilter);
		setColleges(filteredColleges);
	}, [appliedFilter, universities]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getOnboardingStatus();
				setOnboardingStatus(data);
				console.log({ data });
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	// Calculate maxTuition2 and maxTuition3
	useEffect(() => {
		// if (allColleges.length > 0) {
		let maxTuition2Value = allColleges.reduce(
			(max, college) =>
				Math.max(max, college.tuition2 ? parseFloat(college.tuition2) : 0 || 0),
			0
		);

		let maxTuition3Value = allColleges.reduce(
			(max, college) =>
				Math.max(max, college.tuition3 ? parseFloat(college.tuition3) : 0 || 0),
			0
		);

		setMaxTuitionFees({
			maxTuition2: Math.ceil(maxTuition2Value / 1000),
			maxTuition3: Math.ceil(maxTuition3Value / 1000),
		});
		// }
	}, [allColleges]);

	return {
		onboardingStatus,
		universities,
		allColleges,
		page,
		isLoading,
		appliedFilter,
		userData,
		suggestedColleges,
		maxTuitionFees,
		handleFavoriteToggle,
		handleChange,
		setFilter,
	};
};

export default useCollegeState;
