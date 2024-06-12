import { Button, Title } from "@mantine/core";
import type { MultipleChoiceType, YesNoType } from "../../constants/questions";
import styles from "./MultipleChoice.module.css";

type MultipleChoiceProps = {
	field: MultipleChoiceType | YesNoType;
	isLast: boolean;
	onSubmitForm: () => void;
	goToNextStep: () => void;
};

export const MultipleChoice = ({
	field,
	isLast,
	onSubmitForm,
	goToNextStep,
}: MultipleChoiceProps) => {
	let buttonText: string;
	let onSubmit: () => void;

	if (isLast) {
		buttonText = "Submit";
		onSubmit = onSubmitForm;
	} else {
		buttonText = "OK";
		onSubmit = goToNextStep;
	}

	return (
		<div className={styles.wrapper}>
			<Title className={styles.header}>{field.title}</Title>

			<div className={styles.optionWrapper}>
				{field.options.map((option) => (
					<Button
						key={option}
						variant="outline"
						onClick={() => {
							console.log("click");
						}}
					>
						{option}
					</Button>
				))}
			</div>

			<Button type="submit" className={styles.submitButton} onClick={onSubmit}>
				{buttonText}
			</Button>
		</div>
	);
};
