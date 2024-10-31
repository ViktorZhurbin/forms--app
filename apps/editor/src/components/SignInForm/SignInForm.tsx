import { useAuth } from "@/shared/models/db";
import { Button, Stack, Text, Title } from "@mantine/core";
import clsx from "clsx";
import { Redirect } from "wouter";
import { GoogleSignInButtonCustom } from "~/components/GoogleSignInButtonCustom/GoogleSignInButtonCustom";
import { Routes } from "~/constants/routes";
import styles from "./SignInForm.module.css";

type SignInFormProps = {
	redirectTo: string;
	subtitle?: string;
	wrapperClass?: string;
};

export const SignInForm = ({
	subtitle,
	redirectTo,
	wrapperClass,
}: SignInFormProps) => {
	const auth = useAuth();

	if (auth.user) {
		return <Redirect to={Routes.ROOT} />;
	}

	return (
		<div className={clsx(styles.flexWrapper, wrapperClass)}>
			<div>
				<Title order={3}>Log in or create a new account</Title>
				{subtitle && <Text c="dimmed">{subtitle}</Text>}
			</div>
			<Stack gap={8}>
				<GoogleSignInButtonCustom redirectTo={redirectTo}>
					Sign in with Google
				</GoogleSignInButtonCustom>
				<Text>or</Text>
				<Button variant="outline" component="a" href={Routes.CREATE}>
					Create demo form
				</Button>
			</Stack>
		</div>
	);
};
