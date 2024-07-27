import { Anchor } from "@mantine/core";
import { useCallback, useState } from "react";
import { SortableDndList } from "~/components/SortableDndList/SortableDndList";
import type {
	TQuestion,
	TQuestionChoice,
} from "~/models/forms/schema/questions";
import { makeChoiceQuestionOption } from "~/models/forms/write/hooks/useCreateQuestion";
import { useUpdateQuestion } from "~/models/forms/write/hooks/useUpdateQuestion";
import styles from "./MultipleChoice.module.css";
import { MultipleChoiceOption } from "./MultipleChoiceOption/MultipleChoiceOption";

export type MultipleChoiceProps = {
	type: "checkbox" | "radio";
	questionId: TQuestion["id"];
	isFixed?: boolean;
	editMode?: boolean;
	options: TQuestionChoice["options"];
	onSelect?: () => void;
};

type Option = MultipleChoiceProps["options"][number];

export const MultipleChoice = ({
	type,
	questionId,
	options,
	isFixed,
	editMode,
	onSelect,
}: MultipleChoiceProps) => {
	const [values, setValues] = useState<string[]>([]);
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
		const isRadio = type === "radio";

		return options.map(({ id, text }, index, options) => {
			const handleEdit = (text: string) => {
				if (!editMode) return;

				const newOptions = options.map((option) =>
					option.id === id ? { ...option, text } : option,
				);

				updateQuestion({
					id: questionId,
					payload: { options: newOptions },
				});
			};

			const handleSelect = () => {
				setValues((prevValues) => {
					if (prevValues.includes(text)) {
						return prevValues.filter((value) => value !== text);
					}

					return isRadio ? [text] : [...prevValues, text];
				});

				if (isRadio) {
					onSelect?.();
				}
			};

			const handleClick = () => {
				if (editMode) return;

				handleSelect();
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
				<MultipleChoiceOption
					key={id}
					id={id}
					type={type}
					readOnly={!editMode}
					text={text}
					isTempNewOptionId={tempNewOptionId === id}
					placeholder={`Option ${index + 1}`}
					onBlur={handleBlur}
					onClick={handleClick}
					onDelete={deleteOption}
					isSelected={values.includes(text)}
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
		<MultipleChoiceOption
			readOnly
			isDragged
			type={type}
			id={activeItem.id}
			isSelected={values.includes(activeItem.text)}
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
			{editMode && !isFixed && (
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
