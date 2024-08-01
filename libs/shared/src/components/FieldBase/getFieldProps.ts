import type { TField } from "~/models/field/schema";
import styles from "./FieldBase.module.css";

export const getFieldProps = (params: { field: TField; isLast: boolean }) => {
	const { field, isLast } = params;
	const buttonTextFallback = isLast ? "Submit" : "OK";

	return {
		title: field?.title || "...",
		button: {
			text: field?.buttonText || buttonTextFallback,
			className: styles.submitButton,
		},
	};
};
