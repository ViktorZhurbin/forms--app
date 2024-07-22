import { Routes } from "@/shared/constants/routes";
import { useDbAuth } from "@/shared/models/db";
import { clx } from "@/shared/utils/classNames";
import { Text, Title } from "@mantine/core";
import { Redirect } from "wouter";
import { GoogleSignInButtonCustom } from "~/components/GoogleSignInButtonCustom/GoogleSignInButtonCustom";
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
	const auth = useDbAuth();

	if (auth.user) {
		return <Redirect to={Routes.ROOT} />;
	}

	return (
		<div className={clx(styles.flexWrapper, wrapperClass)}>
			<div>
				<Title order={3}>Log in or create a new account</Title>
				{subtitle && <Text c="dimmed">{subtitle}</Text>}
			</div>
			<GoogleSignInButtonCustom redirectTo={redirectTo}>
				Sign in with Google
			</GoogleSignInButtonCustom>
		</div>
	);
};
