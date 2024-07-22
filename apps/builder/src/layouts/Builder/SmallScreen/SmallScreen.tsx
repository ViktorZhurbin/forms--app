import { Button, Text, Title } from "@mantine/core";
import { IconArrowNarrowLeft, IconDeviceLaptop } from "@tabler/icons-react";
import { Link } from "wouter";
import { useAdminPath } from "../hooks/useAdminPath";
import styles from "./SmallScreen.module.css";

export const SmallScreen = () => {
	const adminPath = useAdminPath();

	return (
		<div className={styles.wrapper}>
			<IconDeviceLaptop className={styles.icon} />
			<div className={styles.text}>
				<Title order={3}>Form editor works best on larger screens</Title>
				<Text c="dimmed">
					Note that the forms you build <i>will work</i> on mobile devices!
				</Text>
			</div>
			<Button
				component={Link}
				href={adminPath}
				leftSection={<IconArrowNarrowLeft />}
			>
				Back to dashboard
			</Button>
		</div>
	);
};
