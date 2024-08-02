import { SearchParams, WEB_SITE_URL } from "@/shared/constants/routes";
import { ActionIcon, Card } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import { DarkModeToggle } from "~/components/DarkModeToggle/DarkModeToggle";
import { SignInForm } from "~/components/SignInForm/SignInForm";
import styles from "./SignIn.module.css";

export const SignIn = () => {
	const searchParams = new URL(window.location.href).searchParams;

	const redirectTo =
		searchParams.get(SearchParams.REDIRECT_TO) ?? window.location.origin;

	return (
		<div className={styles.wrapper}>
			<nav className={styles.nav}>
				<ActionIcon
					variant="default"
					size="lg"
					component="a"
					href={WEB_SITE_URL}
				>
					<IconHome />
				</ActionIcon>
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
