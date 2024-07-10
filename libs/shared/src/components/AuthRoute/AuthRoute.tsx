import { Center, Loader } from "@mantine/core";
import { Redirect, Route, type RouteProps } from "wouter";
import { Routes } from "~/constants/location";
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

	return <Redirect to={Routes.LOGIN} />;
};
