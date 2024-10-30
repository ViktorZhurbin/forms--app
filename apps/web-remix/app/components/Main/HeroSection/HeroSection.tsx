import { Stack, Text, Title } from "@mantine/core";
import { Links } from "~/constants/links";
import { CTAButton } from "../../CTAButton/CTAButton";
import styles from "./HeroSection.module.css";

export const HeroSection = () => {
	return (
		<Stack align="center">
			<Title className={styles.title} ta="center">
				A fully-functional{" "}
				<Text inherit component="span" className={styles.accent}>
					Typeform
				</Text>{" "}
				clone
			</Title>

			<Text lh={1.45} ta="center" size="lg" mx="auto" mt="md">
				Start <b>building</b> without authorization.
				<br />
				Create account to <b>share and manage</b> your forms and{" "}
				<b>review responses</b>.
			</Text>

			<Stack gap={6} align="center">
				<CTAButton component="a" href={Links.DemoBuilder} target="_blank">
					Create a form
				</CTAButton>
				<small>No sign up required</small>
			</Stack>
		</Stack>
	);
};
