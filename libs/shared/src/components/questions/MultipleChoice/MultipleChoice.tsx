import { Checkbox, Radio } from "@mantine/core";
import { useState } from "react";
import { FieldTypes } from "~/constants/questions";
import type { TField, TFieldChoice } from "~/models/field/schema";
import styles from "./MultipleChoice.module.css";
import { OptionButton } from "./OptionButton/OptionButton";

export type MultipleChoiceProps = {
	questionId: TField["id"];
	questionType: TField["type"];
	options: TFieldChoice["options"];
	onSelect: () => void;
};

export const MultipleChoice = ({
	// questionId,
	options,
	onSelect,
	questionType,
}: MultipleChoiceProps) => {
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const canChooseMany = questionType === FieldTypes.Checkboxes;
	const Indicator = canChooseMany ? Checkbox.Indicator : Radio.Indicator;

	return (
		<div className={styles.wrapper}>
			{options.map(({ id, text }, index) => {
				const handleSelect = () => {
					setSelectedIds((prevIds) => {
						if (prevIds.includes(id)) {
							return prevIds.filter((value) => value !== id);
						}

						return canChooseMany ? prevIds.concat(id) : [id];
					});

					if (!canChooseMany) {
						setTimeout(() => {
							onSelect();
						}, 100);
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
						isSelected={selectedIds.includes(id)}
					/>
				);
			})}
		</div>
	);
};
