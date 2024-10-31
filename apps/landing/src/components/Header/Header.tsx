import { DarkModeToggle } from "@/shared/components/DarkModeToggle/DarkModeToggle";
import { ActionIcon, Button, Container, Group, Tooltip } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { Links } from "~/constants/links";
import styles from "./Header.module.css";

export const Header = () => {
	return (
		<header className={styles.header}>
			<Container className={styles.inner}>
				<Group gap={20}>
					<Group gap={8}>
						<Button component="a" href={Links.SignIn} target="_blank">
							Open app
						</Button>

						<Tooltip withArrow label="Source code">
							<ActionIcon
								size="lg"
								variant="default"
								component="a"
								target="_blank"
								href={Links.Github}
							>
								<IconBrandGithub />
							</ActionIcon>
						</Tooltip>
					</Group>

					<DarkModeToggle />
				</Group>
			</Container>
		</header>
	);
};
