import { Checkbox, Radio } from "@mantine/core";
import { useState } from "react";
import { FieldTypes } from "~/constants/field";
import type { TField, TFieldChoice } from "~/models/field/schema";
import type { TAnswerChoice } from "~/models/response/schema";
import styles from "./MultipleChoice.module.css";
import { OptionButton } from "./OptionButton/OptionButton";

export type MultipleChoiceProps = {
	fieldId: TField["id"];
	fieldType: TField["type"];
	options: TFieldChoice["options"];
	goToNextStep: () => void;
	answer?: TAnswerChoice;
	onAnswer: (answer: TAnswerChoice) => void;
};

export const MultipleChoice = ({
	fieldId,
	options,
	answer,
	onAnswer,
	goToNextStep,
	fieldType,
}: MultipleChoiceProps) => {
	const [selectedChoices, setSelectedChoices] = useState<
		TFieldChoice["options"]
	>(answer?.value ?? []);

	const canChooseMany = fieldType === FieldTypes.Checkboxes;
	const Indicator = canChooseMany ? Checkbox.Indicator : Radio.Indicator;

	const handleAnswer = (value: TAnswerChoice["value"]) => {
		setSelectedChoices(value);
		onAnswer({ value, fieldId, type: fieldType });

		if (
			fieldType === FieldTypes.YesNo ||
			fieldType === FieldTypes.MultipleChoice
		) {
			setTimeout(goToNextStep, 200);
		}
	};

	return (
		<div className={styles.wrapper}>
			{options.map((option, index) => {
				const isSelected = !!selectedChoices.find(({ id }) => id === option.id);

				const handleSelect = () => {
					let choices = [];
					if (isSelected) {
						choices = selectedChoices.filter(({ id }) => id !== option.id);
					} else {
						choices = canChooseMany ? selectedChoices.concat(option) : [option];
					}

					handleAnswer(choices);
				};

				return (
					<OptionButton
						key={option.id}
						id={option.id}
						text={option.text}
						Indicator={Indicator}
						placeholder={`Option ${index + 1}`}
						onClick={handleSelect}
						isSelected={isSelected}
					/>
				);
			})}
		</div>
	);
};
