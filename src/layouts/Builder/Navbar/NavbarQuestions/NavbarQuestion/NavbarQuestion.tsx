import { tx } from "@instantdb/react";
import { Button, CloseButton, Text } from "@mantine/core";
import { navigate } from "wouter/use-browser-location";
import { QuestionTag } from "~/components/QuestionTag/QuestionTag";
import { SearchParams } from "~/constants/location";
import { dbTransact } from "~/models/db";
import type { QuestionBaseType } from "~/models/questions/questions";
import styles from "./NavbarQuestion.module.css";

interface NavbarQuestionProps
	extends Pick<QuestionBaseType, "id" | "type" | "group" | "title"> {
	order: number;
	isSelected: boolean;
}

export const NavbarQuestion = ({
	id,
	type,
	group,
	title = "...",
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
			<div className={styles.labelGroup}>
				<QuestionTag type={type} group={group} text={order} />
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
		</Button>
	);
};
