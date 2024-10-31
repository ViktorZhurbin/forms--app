import { Button, Container, Text, Title } from "@mantine/core";
import styles from "./Page404.module.css";

export const Page404 = ({ redirectTo }: { redirectTo?: string }) => {
	return (
		<Container className={styles.root}>
			<div className={styles.label}>404</div>

			<Title className={styles.title}>You have found a secret place.</Title>

			<Text c="dimmed" size="lg" ta="center" className={styles.description}>
				Unfortunately, this is only a 404 page. You may have mistyped the
				address, or the page has been moved to another URL.
			</Text>

			{redirectTo && (
				<Button size="md" component="a" href={redirectTo}>
					Go to home page
				</Button>
			)}
		</Container>
	);
};
