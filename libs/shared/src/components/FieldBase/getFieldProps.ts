import { FieldTypes } from "~/constants/field";
import type { TField } from "~/models/field/schema";
import styles from "./FieldBase.module.css";

export const getFieldProps = (params: { field: TField; isLast?: boolean }) => {
	const { field, isLast } = params;

	let titlePlaceholder = "";
	let buttonTextFallback = "";

	switch (field.type) {
		case FieldTypes.Welcome:
			titlePlaceholder = "Your title here...";
			buttonTextFallback = "Start";
			break;

		case FieldTypes.Ending:
			titlePlaceholder = "Your title here...";
			buttonTextFallback = "Create a form";
			break;

		default:
			titlePlaceholder = "...";
			buttonTextFallback = isLast ? "Submit" : "OK";
	}

	return {
		title: {
			text: field?.title || "...",
			placeholder: titlePlaceholder,
		},
		button: {
			text: field?.buttonText || buttonTextFallback,
			className: styles.submitButton,
		},
	};
};
