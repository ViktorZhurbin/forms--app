import { SearchParams } from "@/shared/constants/location";
import { Center } from "@mantine/core";
import { LoginButtonGoogleCustom } from "~/components/LoginButtonGoogleCustom/LoginButtonGoogleCustom";

export const Login = () => {
	const searchParams = new URL(window.location.href).searchParams;

	const redirectTo =
		searchParams.get(SearchParams.REDIRECT_TO) ?? window.location.origin;

	return (
		<Center h="100dvh">
			<LoginButtonGoogleCustom redirectTo={redirectTo} />
		</Center>
	);
};