import { DarkModeToggle } from "@/shared/components/DarkModeToggle/DarkModeToggle";
import { ActionIcon, Button, Container, Divider } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { Links } from "~/constants/links";
import styles from "./Header.module.css";

export const Header = () => {
	return (
		<Container className={styles.header}>
			<Button component="a" href={Links.SignIn} target="_blank">
				Open app
			</Button>

			<ActionIcon
				size="lg"
				variant="default"
				component="a"
				target="_blank"
				href={Links.Github}
			>
				<IconBrandGithub />
			</ActionIcon>

			<Divider orientation="vertical" />

			<DarkModeToggle />
		</Container>
	);
};
