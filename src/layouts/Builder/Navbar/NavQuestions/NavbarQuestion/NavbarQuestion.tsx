import { Button, Group, Text } from "@mantine/core";
import { IconBan } from "@tabler/icons-react";
import { navigate } from "wouter/use-browser-location";
import { SearchParams } from "~/constants/location";
import type { QuestionBaseType } from "~/constants/questions";
import { clx } from "~/utils/classNames";
import styles from "./NavbarQuestion.module.css";

interface NavbarQuestionProps
	extends Pick<QuestionBaseType, "id" | "group" | "title"> {
	order: number;
	isSelected: boolean;
}

export const NavbarQuestion = ({
	id,
	group,
	title,
	order,
	isSelected,
}: NavbarQuestionProps) => {
	const handleSelect = () => {
		const url = new URL(window.location.href);
		url.searchParams.set(SearchParams.BLOCK_ID, id);

		navigate(url);
	};

	return (
		<Button
			variant={isSelected ? "light" : "subtle"}
			justify="start"
			className={styles.button}
			onClick={handleSelect}
		>
			<Label group={group} order={order} title={title} />
		</Button>
	);
};

function Label(props: Pick<NavbarQuestionProps, "group" | "order" | "title">) {
	const { group, order, title } = props;

	return (
		<div className={styles.labelGroup}>
			<Group className={clx(styles.labelTag, styles[group])}>
				<IconBan /> <Text size="xs">{order}</Text>
			</Group>
			<Text size="sm" className={styles.labelTitle}>
				{title}
			</Text>
		</div>
	);
}
