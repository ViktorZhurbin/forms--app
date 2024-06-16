import { Button, Group, Text } from "@mantine/core";
import { IconBan } from "@tabler/icons-react";
import { navigate } from "wouter/use-browser-location";
import { SearchParams } from "../../../../../constants/location";
import type { QuestionBaseType } from "../../../../../constants/questions";
import { clx } from "../../../../../utils/classNames";
import { useSelectedBlockId } from "../../../hooks/useSelectedBlockId";
import styles from "./Question.module.css";

interface QuestionProps
	extends Pick<QuestionBaseType, "id" | "group" | "title"> {
	order: number;
}

export const Question = ({ id, group, title, order }: QuestionProps) => {
	const selectedBlockId = useSelectedBlockId();

	const handleClick = () => {
		const urlSearchParams = new URLSearchParams(window.location.search);
		urlSearchParams.set(SearchParams.BLOCK_ID, id);

		navigate(`?${urlSearchParams.toString()}`);
	};

	const label = <Label group={group} order={order} title={title} />;

	const isSelected = id === selectedBlockId;
	return (
		<>
			<Button
				variant={isSelected ? "light" : "subtle"}
				justify="start"
				className={styles.button}
				onClick={handleClick}
			>
				{label}
			</Button>
		</>
	);
};

function Label(props: Pick<QuestionProps, "group" | "order" | "title">) {
	const { group, order, title } = props;

	return (
		<Group gap={8}>
			<Group className={clx(styles.labelGroup, styles[group])}>
				<IconBan /> <Text size="xs">{order}</Text>
			</Group>
			<Text size="sm" c="dark.4">
				{title}
			</Text>
		</Group>
	);
}
