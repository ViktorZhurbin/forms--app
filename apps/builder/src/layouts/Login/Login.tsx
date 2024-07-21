import { SearchParams } from "@/shared/constants/location";
import { useDbAuth } from "@/shared/models/db";
import { Center } from "@mantine/core";
import { LoginButtonGoogleCustom } from "~/components/LoginButtonGoogleCustom/LoginButtonGoogleCustom";

export const Login = () => {
	const auth = useDbAuth();

	// TODO: uncomment
	// if (auth.user) {
	// 	return <Redirect to={Routes.ROOT} />;
	// }

	const searchParams = new URL(window.location.href).searchParams;

	const redirectTo =
		searchParams.get(SearchParams.REDIRECT_TO) ?? window.location.origin;

	return (
		<Center h="100dvh">
			<LoginButtonGoogleCustom redirectTo={redirectTo} />
		</Center>
	);
};
