import { Anchor, Checkbox, Radio } from "@mantine/core";
import { useCallback, useState } from "react";
import { SortableDndList } from "~/components/SortableDndList/SortableDndList";
import { QuestionTypes } from "~/constants/questions";
import { makeChoiceQuestionOption } from "~/models/form/write/hooks/useCreateQuestion";
import { useUpdateQuestion } from "~/models/form/write/hooks/useUpdateQuestion";
import type {
	TQuestion,
	TQuestionChoice,
} from "~/models/question/schema/question";
import styles from "./MultipleChoiceEdit.module.css";
import { OptionButtonSortable } from "./OptionButtonSortable/OptionButtonSortable";

export type MultipleChoiceEditProps = {
	questionId: TQuestion["id"];
	questionType: TQuestion["type"];
	options: TQuestionChoice["options"];
};

type Option = MultipleChoiceEditProps["options"][number];

export const MultipleChoiceEdit = ({
	questionId,
	questionType,
	options,
}: MultipleChoiceEditProps) => {
	const canChooseMany = questionType === QuestionTypes.Checkboxes;
	const isFixedQuestions = questionType === QuestionTypes.YesNo;
	const Indicator = canChooseMany ? Checkbox.Indicator : Radio.Indicator;

	const [tempNewOptionId, setTempNewOptionId] = useState<string | null>(null);

	const { updateQuestion } = useUpdateQuestion();

	const addOption = () => {
		const newOption = makeChoiceQuestionOption(`Option ${options.length + 1}`);

		updateQuestion({
			id: questionId,
			payload: {
				options: options.concat(newOption),
			},
		});

		setTempNewOptionId(newOption.id);
	};

	const clearTempNewOptionId = () => {
		setTempNewOptionId(null);
	};

	const deleteOption = (id: Option["id"]) => {
		updateQuestion({
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

				updateQuestion({
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
			updateQuestion({
				id: questionId,
				payload: { options: newOptions },
			});
		},
		[questionId, updateQuestion],
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
