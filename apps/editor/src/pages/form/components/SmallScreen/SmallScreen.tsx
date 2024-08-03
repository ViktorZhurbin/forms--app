import { Text, Title } from "@mantine/core";
import { IconDeviceLaptop } from "@tabler/icons-react";
import { ButtonLinks } from "./ButtonLinks/ButtonLinks";
import styles from "./SmallScreen.module.css";

export const SmallScreen = () => {
	return (
		<div className={styles.wrapper}>
			<IconDeviceLaptop className={styles.icon} />
			<div className={styles.text}>
				<Title order={3}>Form editor works best on larger screens</Title>
				<Text c="dimmed">
					Note that the forms you build <i>will work</i> on mobile devices!
				</Text>
			</div>
			<ButtonLinks />
		</div>
	);
};
