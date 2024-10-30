import { Button, Container, Text, Title } from "@mantine/core";
import { CONTAINER } from "~/constants/layout";
import { Links } from "~/constants/links";
import styles from "./HeroSection.module.css";

export const HeroSection = () => {
	return (
		<Container className={styles.wrapper} size={CONTAINER.MaxSize}>
			<Title className={styles.title}>
				A fully-functional{" "}
				<Text component="span" className={styles.highlight} inherit>
					Typeform
				</Text>{" "}
				clone
			</Title>

			<Container p={0} size={600}>
				<Text size="lg" c="dimmed" className={styles.description}>
					Start building without authorization. Create account to share and
					manage your forms and review responses.
				</Text>
			</Container>

			<Button
				size="lg"
				component="a"
				target="_blank"
				href={Links.DemoBuilder}
				className={styles.button}
			>
				Create a form
			</Button>
		</Container>
	);
};
