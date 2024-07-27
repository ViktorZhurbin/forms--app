import { useCallback, useState } from "react";
import { SortableDndList } from "~/components/SortableDndList/SortableDndList";
import type {
	TQuestion,
	TQuestionChoice,
} from "~/models/forms/schema/questions";
import { useUpdateQuestion } from "~/models/forms/write/hooks/useUpdateQuestion";
import styles from "./MultipleChoice.module.css";
import { MultipleChoiceOption } from "./MultipleChoiceOption/MultipleChoiceOption";

export type MultipleChoiceProps = {
	type: "checkbox" | "radio";
	questionId: TQuestion["id"];
	editMode?: boolean;
	options: TQuestionChoice["options"];
	onSelect?: () => void;
};

type Option = MultipleChoiceProps["options"][number];

export const MultipleChoice = ({
	type,
	questionId,
	options,
	editMode,
	onSelect,
}: MultipleChoiceProps) => {
	const [values, setValues] = useState<string[]>([]);

	const { updateQuestion } = useUpdateQuestion();

	const Options = () => {
		const isRadio = type === "radio";

		return options.map(({ id, text }, _, options) => {
			const onChange = (text: string) => {
				const newOptions = options.map((option) =>
					option.id === id ? { ...option, text } : option,
				);

				updateQuestion({
					id: questionId,
					payload: { options: newOptions },
				});
			};

			const onClick = () => {
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

			return (
				<MultipleChoiceOption
					key={id}
					id={id}
					type={type}
					readOnly={!editMode}
					text={text}
					onEdit={onChange}
					onClick={onClick}
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
		</div>
	);
};
