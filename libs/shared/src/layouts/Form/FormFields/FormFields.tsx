import { useCallback } from "react";
import { FieldView } from "~/components/FieldView/FieldView";
import { useFormNanoId } from "~/hooks/useFormNanoId";
import { useLocalResponseWithFormId } from "~/hooks/useLocalResponseWithFormId";
import type { TField } from "~/models/field/schema";
import type { TAnswer, TResponse } from "~/models/response/schema";
import {
	createResponse,
	updateAnswer,
	updateResponse,
} from "~/models/response/write";
import { getNowISOString } from "~/utils/date";
import styles from "./FormFields.module.css";
import { getPosition } from "./getPosition";

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
	const [{ responseId }, setLocalResponseWithFormId] =
		useLocalResponseWithFormId();

	const formNanoId = useFormNanoId();

	const handleAnswer = useCallback(
		async (answer: TAnswer) => {
			if (!responseId) {
				const responseId = await createResponse({
					answer,
					formNanoId,
				});
				setLocalResponseWithFormId({ formNanoId, responseId });

				return;
			}

			await updateAnswer({ responseId, answer });
		},
		[responseId, formNanoId, setLocalResponseWithFormId],
	);

	const isLastStep = currentStep === fields.length - 1;
	const handleSubmit = useCallback(async () => {
		if (isLastStep) {
			await updateResponse({
				responseId,
				payload: { submittedAt: getNowISOString() },
			});
		} else {
			goToNextStep();
		}
	}, [isLastStep, responseId, goToNextStep]);

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
