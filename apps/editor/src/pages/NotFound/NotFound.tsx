import { Button, Text } from "@mantine/core";
import { Link } from "wouter";
import { Routes } from "~/constants/routes";
import styles from "./NotFound.module.css";

export const NotFound = (props: {
	title?: string;
	subtitle?: string;
}) => {
	const {
		title = "We can't find this page.",
		subtitle = "It was moved, deleted, or never existed.",
	} = props;

	return (
		<div className={styles.wrapper}>
			<div className={styles.text}>
				<Text size="lg">{title}</Text>
				<Text>{subtitle}</Text>
			</div>

			<Button variant="default" to={Routes.ROOT} component={Link}>
				Go to my workspace
			</Button>
		</div>
	);
};
