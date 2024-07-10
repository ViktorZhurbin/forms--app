import { LoginButtonGoogleCustom } from "@/shared/components/LoginButtonGoogleCustom/LoginButtonGoogleCustom";
import { SearchParams } from "@/shared/constants/location";
import { Center } from "@mantine/core";

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
