import { Button, Notification, Text, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useIsPreview } from "~/hooks/useIsPreview";
import type { TFieldEnding } from "~/models/field/schema";
import styles from "./Ending.module.css";

export const Ending = (props: { ending: TFieldEnding }) => {
	const isPreview = useIsPreview();

	const {
		ending: { title, description, buttonText, settings },
	} = props;

	const buttonProps = isPreview
		? {}
		: ({ component: "a", href: settings.buttonUrl } as const);

	return (
		<div className={styles.root}>
			<div className={styles.topIcon}>
				<IconCheck stroke={3} />
			</div>

			<div className={styles.hgroup}>
				<Title order={1}>{title}</Title>
				<Text c="dimmed">{description}</Text>
			</div>

			<Button {...buttonProps}>{buttonText}</Button>

			{isPreview && (
				<Notification
					icon={<IconCheck />}
					withBorder
					withCloseButton={false}
					color="teal"
					title="Congrats!"
					className={styles.notification}
				>
					Test successful!
				</Notification>
			)}
		</div>
	);
};
