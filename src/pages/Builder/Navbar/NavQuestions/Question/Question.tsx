import { Button, Group, Text } from "@mantine/core";
import { IconBan } from "@tabler/icons-react";
import { navigate } from "wouter/use-browser-location";
import { SearchParams } from "../../../../../constants/location";
import { QuestionColorsByGroup } from "../../../../../constants/questionMaps";
import type { QuestionBaseType } from "../../../../../constants/questions";
import { useSelectedBlockId } from "../../../hooks/useSelectedBlockId";

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
				px="12px"
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
			<Group
				gap={8}
				wrap="nowrap"
				align="center"
				p="4px 6px"
				c="black"
				style={{ borderRadius: "6px" }}
				bg={QuestionColorsByGroup[group]}
			>
				<IconBan /> <Text size="xs">{order}</Text>
			</Group>
			<Text size="sm" c="dark.4">
				{title}
			</Text>
		</Group>
	);
}
