import { useFormNanoId } from "@/shared/hooks/useFormNanoId";
import { useCurrentForm } from "@/shared/models/form/read";
import { updateForm } from "@/shared/models/form/write";
import { isEqual } from "es-toolkit";
import { useCallback, useState } from "react";

export const usePublishForm = () => {
	const formNanoId = useFormNanoId();
	const form = useCurrentForm();

	const [isLoading, setLoading] = useState(false);

	const isPublished =
		!!form?.questions.length && isEqual(form.questions, form.draftQuestions);

	const isDisabled = !form?.draftQuestions.length;

	const publishForm = useCallback(async () => {
		setLoading(true);

		await updateForm({
			nanoId: formNanoId,
			questions: form?.draftQuestions,
		});

		setLoading(false);
	}, [formNanoId, form?.draftQuestions]);

	return { publishForm, isLoading, isPublished, isDisabled };
};
