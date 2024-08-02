import { Routes, WEB_SITE_URL } from "@/shared/constants/routes";
import { useAuth } from "@/shared/models/db";
import { Button } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { Link } from "wouter";
import { CopyLinkInput } from "../../components/CopyLinkInput/CopyLinkInput";
import { useAdminPath } from "../../hooks/useAdminPath";
import styles from "./ButtonLinks.module.css";

export const ButtonLinks = () => {
	const { isLoading, user } = useAuth();
	const adminPath = useAdminPath();

	if (isLoading) {
		return null;
	}

	if (user) {
		<Button
			component={Link}
			href={adminPath}
			leftSection={<IconArrowNarrowLeft />}
		>
			Back to dashboard
		</Button>;
	}

	return (
		<div className={styles.wrapper}>
			<Button fullWidth component={Link} href={Routes.SIGN_IN}>
				Create an account
			</Button>
			<Button fullWidth component="a" href={WEB_SITE_URL}>
				Go to website
			</Button>
			<CopyLinkInput url={window.location.href} />
		</div>
	);
};
