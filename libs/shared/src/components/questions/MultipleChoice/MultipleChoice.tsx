import { useCallback } from "react";
import { SortableDndList } from "~/components/SortableDndList/SortableDndList";
import type {
	TQuestion,
	TQuestionChoice,
} from "~/models/forms/schema/questions";
import { useUpdateQuestion } from "~/models/forms/write/hooks/useUpdateQuestion";
import styles from "./MultipleChoice.module.css";
import { MultipleChoiceOption } from "./MultipleChoiceOption/MultipleChoiceOption";

type MultipleChoiceProps = {
	questionId: TQuestion["id"];
	editMode?: boolean;
	options: TQuestionChoice["options"];
};

type Option = MultipleChoiceProps["options"][number];

export const MultipleChoice = ({
	questionId,
	options,
	editMode,
}: MultipleChoiceProps) => {
	const { updateQuestion } = useUpdateQuestion();

	const renderChildren = useCallback(
		() =>
			options.map(({ id, text }, _, options) => {
				const onChange = (text: string) => {
					const newOptions = options.map((option) =>
						option.id === id ? { ...option, text } : option,
					);

					updateQuestion({
						id: questionId,
						payload: { options: newOptions },
					});
				};

				return (
					<MultipleChoiceOption
						key={id}
						id={id}
						readOnly={!editMode}
						buttonText={text}
						classNames={{
							textInput: styles.textInput,
						}}
						onChange={onChange}
						onClick={() => {
							console.log("click");
						}}
					/>
				);
			}),
		[editMode, questionId, options, updateQuestion],
	);

	const onDragEnd = useCallback(
		(newOptions: Option[]): void => {
			updateQuestion({
				id: questionId,
				payload: { options: newOptions },
			});
		},
		[questionId, updateQuestion],
	);

	const renderDragOverlay = useCallback(
		(activeItem: Option) => (
			<MultipleChoiceOption
				readOnly
				isDragged
				id={activeItem.id}
				buttonText={activeItem.text}
				classNames={{
					textInput: styles.textInput,
				}}
			/>
		),
		[],
	);

	return (
		<div className={styles.wrapper}>
			<SortableDndList
				list={options}
				onDragEnd={onDragEnd}
				renderChildren={renderChildren}
				renderDragOverlay={renderDragOverlay}
			/>
		</div>
	);
};
