import { Button, Container, Text, Title } from "@mantine/core";
import { Links } from "~/constants/links";
import styles from "./HeroSection.module.css";

export const HeroSection = () => {
	return (
		<Container className={styles.wrapper}>
			<Title className={styles.title}>
				A fully-functional{" "}
				<Text component="span" className={styles.highlight} inherit>
					Typeform
				</Text>{" "}
				clone
			</Title>

			<Container p={0} size={600}>
				<Text size="lg" c="dimmed" className={styles.description}>
					It's two connected apps: <b>form editor</b> to build and manage your
					forms, and actual <b>forms</b> to fill in.
				</Text>
			</Container>

			<Button
				size="lg"
				component="a"
				target="_blank"
				href={Links.DemoBuilder}
				className={styles.button}
			>
				Live demo
			</Button>
		</Container>
	);
};
