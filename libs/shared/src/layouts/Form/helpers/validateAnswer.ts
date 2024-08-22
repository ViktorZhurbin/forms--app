import { ErrorType } from "~/constants/fieldError";
import type { TField } from "~/models/field/schema";
import type { TAnswer, TResponse } from "~/models/response/schema";
import { isEmailField, isFieldRequired } from "~/utils/fieldPredicates";
import { isEmail } from "~/utils/validation";

const getFieldAnswer = <T extends TField>(params: {
	field?: T;
	response?: TResponse;
}) => {
	const { field, response } = params;

	const answer = field?.id && response?.answers[field.id];

	return answer ? (answer as TAnswer<T>) : null;
};

const validateAnswer = (params: {
	field?: TField;
	response?: TResponse;
}) => {
	const { field, response } = params;

	const isRequired = isFieldRequired(field);
	const answer = getFieldAnswer({ field, response });
	const hasAnswer = !!answer?.value.length;

	let errorType = null;
	if (isRequired && !hasAnswer) {
		errorType = ErrorType.Required;
	} else if (isRequired && isEmailField(field)) {
		const answer = getFieldAnswer({ field, response });

		if (!isEmail(answer?.value)) {
			errorType = ErrorType.EmailInvalid;
		}
	}

	return {
		errorType,
		isRequired: errorType === ErrorType.Required,
		isEmailInvalid: errorType === ErrorType.EmailInvalid,
	};
};

export { validateAnswer };
