import { Button, Notification, Text, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { FieldTypes } from "~/constants/field";
import { useIsPreview } from "~/hooks/searchParams/useIsPreview";
import { getCreateFieldPayload } from "~/models/field/helpers/getCreateFieldPayload";
import type { TFieldEnding } from "~/models/field/schema";
import styles from "./Ending.module.css";

const fallbackEnding = getCreateFieldPayload({
	index: 0,
	type: FieldTypes.Ending,
}) as TFieldEnding;

export const Ending = (props: { ending?: TFieldEnding }) => {
	const isPreview = useIsPreview();

	const ending = props.ending ?? fallbackEnding;

	const { title, description, buttonText } = ending;

	const buttonProps = isPreview
		? {}
		: ({
				component: "a",
				href: "https://forms-editor.pages.dev/create",
			} as const);

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
