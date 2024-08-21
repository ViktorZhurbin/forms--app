import { FieldTypes } from "~/constants/field";
import type { TField } from "~/models/field/schema";
import styles from "./FieldBase.module.css";

export const getFieldProps = (params: {
	field: TField;
	isLastQuestion?: boolean;
}) => {
	const { field, isLastQuestion } = params;

	const title = {
		text: field?.title,
		placeholder: "",
	};

	const button = {
		text: isLastQuestion ? "Submit" : field?.buttonText,
		className: styles.submitButton,
	};

	switch (field.type) {
		case FieldTypes.Welcome:
		case FieldTypes.Statement:
			title.placeholder = "Your question here...";
			button.text ||= "Continue";
			break;

		case FieldTypes.Ending:
			title.placeholder = "Say bye...";
			button.text ||= "Make your own form";
			break;

		default:
			title.placeholder = "Your question here...";
			button.text ||= "OK";
	}

	return {
		title,
		button,
	};
};
