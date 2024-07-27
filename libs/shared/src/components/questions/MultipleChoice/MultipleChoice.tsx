import { Checkbox, Radio } from "@mantine/core";
import { useState } from "react";
import { QuestionTypes } from "~/constants/questions";
import type {
	TQuestion,
	TQuestionChoice,
} from "~/models/forms/schema/questions";
import styles from "./MultipleChoice.module.css";
import { OptionButton } from "./OptionButton/OptionButton";

export type MultipleChoiceProps = {
	questionId: TQuestion["id"];
	questionType: TQuestion["type"];
	options: TQuestionChoice["options"];
	onSelect: () => void;
};

export const MultipleChoice = ({
	// questionId,
	options,
	onSelect,
	questionType,
}: MultipleChoiceProps) => {
	const [values, setValues] = useState<string[]>([]);
	const canChooseMany = questionType === QuestionTypes.Checkboxes;
	const Indicator = canChooseMany ? Checkbox.Indicator : Radio.Indicator;

	return (
		<div className={styles.wrapper}>
			{options.map(({ id, text }, index) => {
				const handleSelect = () => {
					setValues((prevValues) => {
						if (prevValues.includes(text)) {
							return prevValues.filter((value) => value !== text);
						}

						return canChooseMany ? [...prevValues, text] : [text];
					});

					if (!canChooseMany) {
						onSelect?.();
					}
				};

				return (
					<OptionButton
						key={id}
						id={id}
						text={text}
						Indicator={Indicator}
						placeholder={`Option ${index + 1}`}
						onClick={handleSelect}
						isSelected={values.includes(text)}
					/>
				);
			})}
		</div>
	);
};
