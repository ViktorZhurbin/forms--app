import { useFormId } from "@/shared/hooks/useFormId";
import { useCurrentForm } from "@/shared/models/forms/read";
import { updateForm } from "@/shared/models/forms/write";
import { isEqual } from "lodash";
import { useCallback, useState } from "react";

export const usePublishForm = () => {
	const formId = useFormId();
	const form = useCurrentForm();

	const [isLoading, setLoading] = useState(false);

	const isPublished = form
		? isEqual(form.questions, form.draftQuestions)
		: true;

	const publishForm = useCallback(async () => {
		setLoading(true);

		await updateForm({
			id: formId,
			questions: form?.draftQuestions,
		});

		setLoading(false);
	}, [formId, form?.draftQuestions]);

	return { publishForm, isLoading, isPublished };
};
