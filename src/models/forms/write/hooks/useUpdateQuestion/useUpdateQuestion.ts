import { tx } from "@instantdb/react";
import { useFormId } from "~/layouts/Builder/hooks/useFormId";
import { dbTransact } from "~/models/db";
import { useForm } from "~/models/forms/read";
import type { TQuestion } from "../../../schema/questions";

type UpdateQuestionParams = {
	id: TQuestion["id"];
	payload: Partial<TQuestion>;
};

export const useUpdateQuestion = () => {
	const formId = useFormId();
	const form = useForm(formId);

	const updateQuestion = async ({ id, payload }: UpdateQuestionParams) => {
		const newQuestions = form?.questions.map((question) => {
			if (question.id === id) {
				return { ...question, ...payload };
			}

			return question;
		});

		await dbTransact(tx.forms[formId].update({ questions: newQuestions }));
	};

	return { updateQuestion };
};
