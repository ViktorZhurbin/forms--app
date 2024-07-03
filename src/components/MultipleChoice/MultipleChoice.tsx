import type { ChoiceType, QuestionType } from "~/models/questions/questions";
import { updateChoiceOption } from "~/models/questions/write";
import { EditableButtonOld } from "../EditableButtonOld/EditableButtonOld";
import styles from "./MultipleChoice.module.css";

type MultipleChoiceProps = {
	questionId: QuestionType["id"];
	readOnly?: boolean;
	options: ChoiceType["options"];
};

export const MultipleChoice = ({
	questionId,
	options,
	readOnly,
}: MultipleChoiceProps) => {
	return (
		<div className={styles.wrapper}>
			{options.map(({ id, text }) => {
				const onChange = (text: string) => {
					updateChoiceOption({
						id,
						questionId,
						update: { text },
						allOptions: options,
					});
				};

				return (
					<EditableButtonOld
						key={id}
						readOnly={readOnly}
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
