import type {
	TQuestion,
	TQuestionChoice,
} from "~/models/forms/schema/questions";
import { useUpdateQuestion } from "~/models/forms/write/hooks/useUpdateQuestion";
import { EditableButtonOld } from "../EditableButtonOld/EditableButtonOld";
import styles from "./MultipleChoice.module.css";

type MultipleChoiceProps = {
	questionId: TQuestion["id"];
	editMode?: boolean;
	options: TQuestionChoice["options"];
};

export const MultipleChoice = ({
	questionId,
	options,
	editMode,
}: MultipleChoiceProps) => {
	const { updateQuestion } = useUpdateQuestion();

	return (
		<div className={styles.wrapper}>
			{options.map(({ id, text }, _, options) => {
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
					<EditableButtonOld
						key={id}
						readOnly={!editMode}
						variant="outline"
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
			})}
		</div>
	);
};
