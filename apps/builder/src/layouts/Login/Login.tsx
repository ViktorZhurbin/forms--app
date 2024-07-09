import { GoogleLoginButton } from "@/shared/components/GoogleLoginButton/GoogleLoginButton";
import { Routes } from "@/shared/constants/location";
import { Center } from "@mantine/core";
import { navigate } from "wouter/use-browser-location";

export const Login = () => {
	return (
		<Center h="100dvh">
			<GoogleLoginButton
				onSuccess={() => {
					navigate(Routes.ROOT, { replace: true });
				}}
			/>
		</Center>
	);
};
