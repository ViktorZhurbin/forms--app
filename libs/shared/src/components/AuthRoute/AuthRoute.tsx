import { Center, Loader } from "@mantine/core";
import { Redirect, Route, type RouteProps } from "wouter";
import { Routes, SearchParams } from "~/constants/location";
import { useDbAuth } from "~/models/db";

export const AuthRoute = (props: RouteProps) => {
	const { isLoading, user } = useDbAuth();

	if (user) {
		return <Route {...props} />;
	}

	if (isLoading) {
		return (
			<Center h="100dvh">
				<Loader color="gray" type="dots" />
			</Center>
		);
	}

	const searchParams = new URLSearchParams({
		[SearchParams.REDIRECT_TO]: window.location.href,
	});

	return <Redirect to={`${Routes.LOGIN}?${searchParams.toString()}`} />;
};
