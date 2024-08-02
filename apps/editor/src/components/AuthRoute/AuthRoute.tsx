import { Routes, SearchParams } from "@/shared/constants/routes";
import { useAuth } from "@/shared/models/db";
import { Redirect, Route, type RouteProps } from "wouter";
import { FullScreenLoader } from "../FullScreenLoader/FullScreenLoader";

export const AuthRoute = (props: RouteProps) => {
	const { isLoading, user } = useAuth();

	if (user) {
		return <Route {...props} />;
	}

	if (isLoading) {
		return <FullScreenLoader />;
	}

	const searchParams = new URLSearchParams({
		[SearchParams.REDIRECT_TO]: window.location.href,
	});

	return <Redirect to={`${Routes.SIGN_IN}?${searchParams.toString()}`} />;
};
