import type { MultipleChoiceType, YesNoType } from "../../constants/questions";
import { EditableButton } from "../EditableButton/EditableButton";
import styles from "./MultipleChoice.module.css";

type MultipleChoiceProps = {
	readOnly?: boolean;
	question: MultipleChoiceType | YesNoType;
};

export const MultipleChoice = ({ question, readOnly }: MultipleChoiceProps) => {
	return (
		<div className={styles.wrapper}>
			{question.options.map((option) => (
				<EditableButton
					key={option}
					readOnly={readOnly}
					variant="outline"
					buttonText={option}
					classNames={{
						textInput: styles.textInput,
					}}
					onClick={() => {
						console.log("click");
					}}
				/>
			))}
		</div>
	);
};
