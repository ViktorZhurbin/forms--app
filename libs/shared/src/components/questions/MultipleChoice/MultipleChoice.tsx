import { Checkbox, Radio } from "@mantine/core";
import { FieldTypes } from "~/constants/field";
import type { TField, TFieldChoice } from "~/models/field/schema";
import styles from "./MultipleChoice.module.css";
import { OptionButton } from "./OptionButton/OptionButton";

export type MultipleChoiceProps = {
	questionId: TField["id"];
	questionType: TField["type"];
	options: TFieldChoice["options"];
	onSelect: () => void;
	selectedChoices: TFieldChoice["options"];
	setChoices: (choices: TFieldChoice["options"]) => void;
};

export const MultipleChoice = ({
	// questionId,
	options,
	// onSelect,
	setChoices,
	selectedChoices,
	questionType,
}: MultipleChoiceProps) => {
	const canChooseMany = questionType === FieldTypes.Checkboxes;
	const Indicator = canChooseMany ? Checkbox.Indicator : Radio.Indicator;

	return (
		<div className={styles.wrapper}>
			{options.map((option, index) => {
				const handleSelect = () => {
					if (selectedChoices.find(({ id }) => id === option.id)) {
						const choices = selectedChoices.filter(
							({ id }) => id !== option.id,
						);
						setChoices(choices);

						return;
					}

					const choices = canChooseMany
						? selectedChoices.concat(option)
						: [option];

					setChoices(choices);

					// if (!canChooseMany) {
					// 	setTimeout(() => {
					// 		onSelect();
					// 	}, 100);
					// }
				};

				return (
					<OptionButton
						key={option.id}
						id={option.id}
						text={option.text}
						Indicator={Indicator}
						placeholder={`Option ${index + 1}`}
						onClick={handleSelect}
						isSelected={!!selectedChoices.find(({ id }) => id === option.id)}
					/>
				);
			})}
		</div>
	);
};
