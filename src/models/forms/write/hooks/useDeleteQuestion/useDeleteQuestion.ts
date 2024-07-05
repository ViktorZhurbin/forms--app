import { tx } from "@instantdb/react";
import { useFormId } from "~/layouts/Builder/hooks/useFormId";
import { dbTransact } from "~/models/db";
import { useCurrentForm } from "~/models/forms/read";
import type { TQuestion } from "../../../schema/questions";

export const useDeleteQuestion = () => {
	const formId = useFormId();
	const form = useCurrentForm();

	const deleteQuestion = async (questionId: TQuestion["id"]) => {
		const newQuestions = form?.questions.filter(
			(question) => question.id !== questionId,
		);
		await dbTransact(tx.forms[formId].update({ questions: newQuestions }));
	};

	return { deleteQuestion };
};
