import { useTable } from "tinybase/ui-react";
import { useParams } from "wouter";
import type { QuestionType } from "~/constants/questions";

export const useFormQuestions = () => {
	const formId = useParams();

	const allQuestions = useTable("questions");

	const formQuestions = Object.values(allQuestions).filter(
		(question) => question.formId === formId?.id,
	);

	return formQuestions as unknown as QuestionType[];
};
