import { useFormNanoId } from "@/shared/hooks/useFormNanoId";
import { useFormOrderedFields } from "@/shared/models/field/read";
import { publishFormFields } from "@/shared/models/field/write";
import { isEqual } from "es-toolkit";
import { useCallback, useState } from "react";

export const usePublishForm = () => {
	const formNanoId = useFormNanoId();
	const { fields, draftFields } = useFormOrderedFields();

	const [isLoading, setLoading] = useState(false);

	console.log({ fields, draftFields });

	const isPublished = isEqual(fields, draftFields);

	const publishForm = useCallback(async () => {
		setLoading(true);

		await publishFormFields({ formNanoId, draftFields });

		setLoading(false);
	}, [formNanoId, draftFields]);

	return { publishForm, isLoading, isPublished };
};
