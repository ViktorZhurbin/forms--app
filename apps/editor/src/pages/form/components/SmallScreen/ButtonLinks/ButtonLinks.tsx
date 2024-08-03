import { WEB_SITE_URL } from "@/shared/constants/location";
import { useAuth } from "@/shared/models/db";
import { Button } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { Link } from "wouter";
import { Routes } from "~/constants/routes";
import { useWsPath } from "~/pages/form/hooks/useWsPath";
import { CopyLinkInput } from "../../CopyLinkInput/CopyLinkInput";
import styles from "./ButtonLinks.module.css";

export const ButtonLinks = () => {
	const { isLoading, user } = useAuth();
	const wsPath = useWsPath();

	if (isLoading) {
		return null;
	}

	if (user) {
		return (
			<Button
				component={Link}
				href={`~${wsPath}`}
				leftSection={<IconArrowNarrowLeft />}
			>
				Back to dashboard
			</Button>
		);
	}

	return (
		<div className={styles.wrapper}>
			<Button fullWidth component={Link} href={`~${Routes.SIGN_IN}`}>
				Create an account
			</Button>
			<Button fullWidth component="a" href={WEB_SITE_URL}>
				Go to website
			</Button>
			<CopyLinkInput url={window.location.href} />
		</div>
	);
};
