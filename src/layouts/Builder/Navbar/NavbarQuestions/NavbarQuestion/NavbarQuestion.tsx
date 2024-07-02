import { tx } from "@instantdb/react";
import { Button, CloseButton, Text } from "@mantine/core";
import { navigate } from "wouter/use-browser-location";
import { QuestionTag } from "~/components/QuestionTag/QuestionTag";
import { SearchParams } from "~/constants/location";
import { dbTransact } from "~/models/db";
import type { QuestionBaseType } from "~/models/questions/questions";
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
			data-active={isSelected}
			justify="start"
			className={styles.button}
			onClick={handleSelect}
		>
			<Label id={id} group={group} order={order} title={title} />
		</Button>
	);
};

function Label(
	props: Pick<NavbarQuestionProps, "id" | "group" | "order" | "title">,
) {
	const { id, group, order, title } = props;

	return (
		<div className={styles.labelGroup}>
			<QuestionTag group={group} text={order} />
			<Text size="sm" className={styles.labelTitle}>
				{title}
			</Text>
			<CloseButton
				component="div"
				className={styles.removeButton}
				onClick={(event) => {
					event.preventDefault();

					dbTransact([tx.forms[id].delete()]);
				}}
			/>
		</div>
	);
}
