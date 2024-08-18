import { Anchor, Checkbox, Radio } from "@mantine/core";
import { useState } from "react";
import { List, arrayMove } from "react-movable";
import { DragHandle } from "~/components/DragHandle/DragHandle";
import { FieldTypes } from "~/constants/field";
import type { TField, TFieldChoice } from "~/models/field/schema";
import { createChoiceFieldOption, updateField } from "~/models/field/write";
import { OptionButton } from "../OptionButton/OptionButton";
import styles from "./MultipleChoiceEdit.module.css";

export type MultipleChoiceEditProps = {
	fieldId: TField["id"];
	fieldType: TField["type"];
	options: TFieldChoice["options"];
};

type Option = MultipleChoiceEditProps["options"][number];

export const MultipleChoiceEdit = ({
	fieldId,
	fieldType,
	options,
}: MultipleChoiceEditProps) => {
	const canChooseMany = fieldType === FieldTypes.Checkboxes;
	const isFixedOptions = fieldType === FieldTypes.YesNo;
	const Indicator = canChooseMany ? Checkbox.Indicator : Radio.Indicator;

	const [tempNewOptionId, setTempNewOptionId] = useState<string | null>(null);

	const addOption = async () => {
		const newOptionId = await createChoiceFieldOption({
			options,
			fieldId: fieldId,
		});

		setTempNewOptionId(newOptionId);
	};

	const clearTempNewOptionId = () => {
		setTempNewOptionId(null);
	};

	const deleteOption = (id: Option["id"]) => {
		updateField({
			id: fieldId,
			payload: {
				options: options.filter((option) => option.id !== id),
			},
		});
	};

	return (
		<div className={styles.wrapper}>
			<List
				values={options}
				onChange={({ oldIndex, newIndex }) => {
					const newItems = arrayMove(options, oldIndex, newIndex);

					updateField({
						id: fieldId,
						payload: { options: newItems },
					});
				}}
				renderList={({ children, props }) => (
					<div {...props} className={styles.wrapper}>
						{children}
					</div>
				)}
				renderItem={({
					value: option,
					index = 0,
					isDragged,
					isSelected,
					props,
				}) => {
					const handleEdit = (text: string) => {
						const newOptions = options.map((item) =>
							item.id === option.id ? { ...item, text } : item,
						);

						updateField({
							id: fieldId,
							payload: { options: newOptions },
						});
					};

					const handleBlur = (value: string) => {
						if (option.text !== value) {
							handleEdit?.(value);
						}

						if (tempNewOptionId === option.id) {
							clearTempNewOptionId?.();
						}
					};

					return (
						<div {...props} key={option.id} className={styles.optionWrapper}>
							<DragHandle
								key={`handle-${option.id}`}
								isDragged={isDragged}
								className={styles.dragHandle}
							/>

							<OptionButton
								isEditable
								key={`option-${option.id}`}
								id={option.id}
								text={option.text}
								isDragged={isDragged || isSelected}
								Indicator={Indicator}
								isTempNewOptionId={tempNewOptionId === option.id}
								placeholder={`Option ${index + 1}`}
								onBlur={handleBlur}
								onDelete={deleteOption}
							/>
						</div>
					);
				}}
			/>

			{!isFixedOptions && (
				<Anchor
					fz="sm"
					ta="start"
					w="max-content"
					component="button"
					underline="always"
					onClick={addOption}
				>
					Add option
				</Anchor>
			)}
		</div>
	);
};
