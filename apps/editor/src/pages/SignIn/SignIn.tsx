import { DarkModeToggle } from "@/shared/components/DarkModeToggle/DarkModeToggle";
import { SearchParams } from "@/shared/constants/location";
import { Card } from "@mantine/core";
import { SignInForm } from "~/components/SignInForm/SignInForm";
import styles from "./SignIn.module.css";

export const SignIn = () => {
	const searchParams = new URL(window.location.href).searchParams;

	const redirectTo =
		searchParams.get(SearchParams.REDIRECT_TO) ?? window.location.origin;

	return (
		<div className={styles.wrapper}>
			<nav className={styles.nav}>
				<DarkModeToggle />
			</nav>
			<div className={styles.content}>
				<Card withBorder className={styles.card}>
					<SignInForm redirectTo={redirectTo} />
				</Card>
			</div>
		</div>
	);
};
