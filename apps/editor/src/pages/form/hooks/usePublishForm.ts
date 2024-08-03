import { useFormFields } from "@/shared/models/field/read";
import type { TField } from "@/shared/models/field/schema";
import { updateManyFields } from "@/shared/models/field/write";
import { useCallback, useState } from "react";

export const usePublishForm = () => {
	const fields = useFormFields();

	const [isLoading, setLoading] = useState(false);

	const defaultValue = {
		publishedFields: [],
		unpublishedFields: [],
	};
	const { publishedFields, unpublishedFields } =
		fields?.reduce<{
			publishedFields: TField[];
			unpublishedFields: TField[];
		}>((acc, field) => {
			if (field.isPublished) {
				acc.publishedFields.push(field);
			} else {
				acc.unpublishedFields.push(field);
			}

			return acc;
		}, defaultValue) ?? defaultValue;

	const isPublished = publishedFields.length > 0 && !unpublishedFields.length;
	const isDisabled = !unpublishedFields.length;

	const publishForm = useCallback(async () => {
		setLoading(true);

		const update = unpublishedFields.map(({ id }) => {
			return {
				id,
				payload: { isPublished: true },
			};
		});

		await updateManyFields(update);

		setLoading(false);
	}, [unpublishedFields]);

	return { publishForm, isLoading, isPublished, isDisabled };
};
