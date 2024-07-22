import { Routes, SearchParams } from "@/shared/constants/location";
import { useDbAuth } from "@/shared/models/db";
import { Center } from "@mantine/core";
import { Redirect } from "wouter";
import { LoginButtonGoogleCustom } from "~/components/LoginButtonGoogleCustom/LoginButtonGoogleCustom";

export const Login = () => {
	const auth = useDbAuth();

	if (auth.user) {
		return <Redirect to={Routes.ROOT} />;
	}

	const searchParams = new URL(window.location.href).searchParams;

	const redirectTo =
		searchParams.get(SearchParams.REDIRECT_TO) ?? window.location.origin;

	return (
		<Center h="100dvh">
			<LoginButtonGoogleCustom redirectTo={redirectTo}>
				Sign in with Google
			</LoginButtonGoogleCustom>
		</Center>
	);
};
