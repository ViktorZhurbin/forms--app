import { Routes } from "@/shared/constants/location";
import { useDbAuth } from "@/shared/models/db";
import { navigate } from "wouter/use-browser-location";

export const useAuth = () => {
	const { isLoading, user } = useDbAuth();

	if (!isLoading && !user) {
		navigate(Routes.LOGIN);
	}

	return { isLoading };
};
