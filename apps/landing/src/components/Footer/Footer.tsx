import { ActionIcon, Container, Group, Text } from "@mantine/core";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { Links } from "~/constants/links";
import styles from "./Footer.module.css";

const LINKS = [
	{ Icon: IconBrandLinkedin, href: Links.Linkedin },
	{ Icon: IconBrandGithub, href: Links.Github },
];

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Container className={styles.inner}>
				<Text size="sm">Made by Viktor Zhurbin</Text>

				<Group gap={0} wrap="nowrap" justify="flex-end">
					{LINKS.map(({ Icon, href }) => (
						<ActionIcon
							key={href}
							size="lg"
							color="gray"
							variant="subtle"
							component="a"
							href={href}
							target="_blank"
						>
							<Icon stroke={1.5} />
						</ActionIcon>
					))}
				</Group>
			</Container>
		</footer>
	);
};
