import { Anchor, Checkbox, Radio } from "@mantine/core";
import { useCallback, useState } from "react";
import { SortableDndList } from "~/components/SortableDndList/SortableDndList";
import { FieldTypes } from "~/constants/fields";
import type { TField, TFieldChoice } from "~/models/field/schema";
import { createChoiceFieldOption, updateField } from "~/models/field/write";
import styles from "./MultipleChoiceEdit.module.css";
import { OptionButtonSortable } from "./OptionButtonSortable/OptionButtonSortable";

export type MultipleChoiceEditProps = {
	questionId: TField["id"];
	questionType: TField["type"];
	options: TFieldChoice["options"];
};

type Option = MultipleChoiceEditProps["options"][number];

export const MultipleChoiceEdit = ({
	questionId,
	questionType,
	options,
}: MultipleChoiceEditProps) => {
	const canChooseMany = questionType === FieldTypes.Checkboxes;
	const isFixedQuestions = questionType === FieldTypes.YesNo;
	const Indicator = canChooseMany ? Checkbox.Indicator : Radio.Indicator;

	const [tempNewOptionId, setTempNewOptionId] = useState<string | null>(null);

	const addOption = async () => {
		const newOptionId = await createChoiceFieldOption({
			options,
			fieldId: questionId,
		});

		setTempNewOptionId(newOptionId);
	};

	const clearTempNewOptionId = () => {
		setTempNewOptionId(null);
	};

	const deleteOption = (id: Option["id"]) => {
		updateField({
			id: questionId,
			payload: {
				options: options.filter((option) => option.id !== id),
			},
		});
	};

	const Options = () => {
		return options.map(({ id, text }, index, options) => {
			const handleEdit = (text: string) => {
				const newOptions = options.map((option) =>
					option.id === id ? { ...option, text } : option,
				);

				updateField({
					id: questionId,
					payload: { options: newOptions },
				});
			};

			const handleBlur = (value: string) => {
				if (text !== value) {
					handleEdit?.(value);
				}

				if (tempNewOptionId === id) {
					clearTempNewOptionId?.();
				}
			};

			return (
				<OptionButtonSortable
					key={id}
					id={id}
					text={text}
					Indicator={Indicator}
					isTempNewOptionId={tempNewOptionId === id}
					placeholder={`Option ${index + 1}`}
					onBlur={handleBlur}
					onDelete={deleteOption}
				/>
			);
		});
	};

	const onDragEnd = useCallback(
		(newOptions: Option[]): void => {
			updateField({
				id: questionId,
				payload: { options: newOptions },
			});
		},
		[questionId],
	);

	const DragOverlayItem = ({ activeItem }: { activeItem: Option }) => (
		<OptionButtonSortable
			isDragged
			id={activeItem.id}
			Indicator={Indicator}
			text={activeItem.text}
		/>
	);

	return (
		<div className={styles.wrapper}>
			<SortableDndList
				list={options}
				onDragEnd={onDragEnd}
				Options={Options}
				DragOverlayItem={DragOverlayItem}
			/>
			{!isFixedQuestions && (
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
