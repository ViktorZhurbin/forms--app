import { Button, Text } from "@mantine/core";
import { Link } from "wouter";
import { EditorRoutes } from "~/constants/routes";
import styles from "./NotFound.module.css";

export const NotFound = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.text}>
				<Text size="lg">We can't find this page.</Text>
				<Text>It was moved, deleted, or never existed.</Text>
			</div>

			<Button variant="default" to={EditorRoutes.ROOT} component={Link}>
				Go to my workspace
			</Button>
		</div>
	);
};
