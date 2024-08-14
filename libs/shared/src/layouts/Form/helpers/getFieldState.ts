import type { TField } from "~/models/field/schema";
import type { TResponse } from "~/models/response/schema";

const getIsFieldRequired = (field?: TField): boolean => {
	return (
		!!field?.settings &&
		"isRequired" in field.settings &&
		!!field.settings?.isRequired
	);
};

const getHasFieldAnswer = (params: {
	fieldId?: TField["id"];
	response?: TResponse;
}) => {
	const { fieldId, response } = params;

	const answer = fieldId ? response?.answers[fieldId] : null;
	const hasAnswer = !!answer?.value.length;

	return hasAnswer;
};

const getFieldState = (params: {
	fields: TField[];
	index: number;
	response?: TResponse;
}) => {
	const { fields, index, response } = params;

	const field = fields[index];
	const isRequired = getIsFieldRequired(field);
	const hasAnswer = getHasFieldAnswer({ fieldId: field?.id, response });

	return {
		isRequired,
		hasAnswer,
		isRequiredAndHasNoAnswer: isRequired && !hasAnswer,
	};
};

export { getFieldState };
