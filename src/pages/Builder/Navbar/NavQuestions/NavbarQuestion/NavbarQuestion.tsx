import { Button, Group, Text } from "@mantine/core";
import { IconBan } from "@tabler/icons-react";
import { navigate } from "wouter/use-browser-location";
import { SearchParams } from "../../../../../constants/location";
import type { QuestionBaseType } from "../../../../../constants/questions";
import { clx } from "../../../../../utils/classNames";
import { useSelectedBlockId } from "../../../hooks/useSelectedBlockId";
import styles from "./NavbarQuestion.module.css";

interface NavbarQuestionProps
	extends Pick<QuestionBaseType, "id" | "group" | "title"> {
	order: number;
}

export const NavbarQuestion = ({
	id,
	group,
	title,
	order,
}: NavbarQuestionProps) => {
	const selectedBlockId = useSelectedBlockId();

	const handleClick = () => {
		const urlSearchParams = new URLSearchParams(window.location.search);
		urlSearchParams.set(SearchParams.BLOCK_ID, id);

		navigate(`?${urlSearchParams.toString()}`);
	};

	const label = <Label group={group} order={order} title={title} />;

	const isSelected = id === selectedBlockId;
	return (
		<Button
			variant={isSelected ? "light" : "subtle"}
			justify="start"
			className={styles.button}
			onClick={handleClick}
		>
			{label}
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
			<Text size="sm" c="dark.4" className={styles.labelTitle}>
				{title}
			</Text>
		</div>
	);
}
