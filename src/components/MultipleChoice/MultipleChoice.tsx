import { Button } from "@mantine/core";
import type { MultipleChoiceType, YesNoType } from "../../constants/questions";
import styles from "./MultipleChoice.module.css";

type MultipleChoiceProps = {
	question: MultipleChoiceType | YesNoType;
};

export const MultipleChoice = ({ question }: MultipleChoiceProps) => {
	return (
		<div className={styles.optionWrapper}>
			{question.options.map((option) => (
				// This doesn't need to be a button. Try TextInput
				<Button
					key={option}
					miw={200}
					variant="outline"
					onClick={() => {
						console.log("click");
					}}
				>
					{option}
				</Button>
			))}
		</div>
	);
};
