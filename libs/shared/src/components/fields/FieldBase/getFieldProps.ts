import { FieldTypes } from "~/constants/field";
import type { TField } from "~/models/field/schema";
import styles from "./FieldBase.module.css";

export const getFieldProps = (params: {
	field: TField;
	isLastQuestion?: boolean;
}) => {
	const { field, isLastQuestion } = params;

	let titlePlaceholder = "";
	let buttonTextFallback = "";

	switch (field.type) {
		case FieldTypes.Welcome:
			titlePlaceholder = "Say hi...";
			buttonTextFallback = "Start";
			break;

		case FieldTypes.Ending:
			titlePlaceholder = "Say bye...";
			buttonTextFallback = "Create a form";
			break;

		default:
			titlePlaceholder = "Your question here...";
			buttonTextFallback = isLastQuestion ? "Submit" : "OK";
	}

	return {
		title: {
			text: field?.title,
			placeholder: titlePlaceholder,
		},
		button: {
			text: field?.buttonText || buttonTextFallback,
			className: styles.submitButton,
		},
	};
};
