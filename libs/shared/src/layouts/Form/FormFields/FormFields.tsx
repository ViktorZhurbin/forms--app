import { FieldView } from "~/components/FieldView/FieldView";
import type { TField } from "~/models/field/schema";
import type { TResponse } from "~/models/response/schema";
import styles from "./FormFields.module.css";
import { getPosition } from "./getPosition";
import { useAnswer } from "./useAnswer";

export type FormFieldsProps = {
	currentStep: number;
	fields: TField[];
	answers?: TResponse["answers"];
	goToNextStep: () => void;
};

export const FormFields = ({
	fields,
	answers = {},
	currentStep,
	goToNextStep,
}: FormFieldsProps) => {
	const { handleAnswer, handleSubmit } = useAnswer({
		goToNextStep,
		isLastStep: currentStep === fields.length - 1,
	});

	return fields.flatMap((field, index) => {
		const isRendered = Math.abs(index - currentStep) <= 1;

		if (!isRendered) return [];

		const position = getPosition(currentStep, index);
		const answer = answers[field.id];

		return (
			<div
				key={field.id}
				className={styles.fieldWrapper}
				data-position={position}
			>
				<FieldView
					order={index + 1}
					isLast={index === fields.length - 1}
					field={field}
					answer={answer}
					onSubmit={handleSubmit}
					onAnswer={handleAnswer}
					goToNextStep={goToNextStep}
				/>
			</div>
		);
	});
};
