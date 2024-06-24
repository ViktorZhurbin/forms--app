import { Text } from "@mantine/core";
import { useTable } from "tinybase/ui-react";
import { StoreInspector } from "tinybase/ui-react-dom";
import { useParams } from "wouter";
import type { QuestionType } from "~/constants/questions";
import { useSelectedBlockId } from "../../hooks/useSelectedBlockId";
import styles from "./NavQuestions.module.css";
import { NavbarQuestion } from "./NavbarQuestion/NavbarQuestion";

export const NavQuestions = () => {
	const formId = useParams()?.id;

	const allQuestions = useTable("questions");
	const questions = Object.values(allQuestions).filter(
		(question) => question.formId === formId,
	) as unknown as QuestionType[];

	const selectedBlockId = useSelectedBlockId(questions[0]?.id);

	return (
		<>
			<Text c="dimmed" size="sm" mb={8} p="0 12px">
				Questions
			</Text>
			<div className={styles.questionsList}>
				{questions.map(({ id, group, title }, index) => (
					<NavbarQuestion
						key={id}
						id={id}
						order={index + 1}
						group={group}
						title={title}
						isSelected={selectedBlockId ? id === selectedBlockId : index === 0}
					/>
				))}
			</div>
			<StoreInspector />
		</>
	);
};
