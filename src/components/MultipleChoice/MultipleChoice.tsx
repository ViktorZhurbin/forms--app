import { Button, Title } from "@mantine/core";
import type { FormField } from "../../constants/form";
import styles from "./MultipleChoice.module.css";

type MultipleChoiceProps = {
	field: FormField;
	isLast: boolean;
	positionDataAttr: string;
	onSubmitForm: () => void;
	goToNextStep: () => void;
};

export const MultipleChoice = ({
	field,
	isLast,
	positionDataAttr,
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
		<div className={styles.root} data-position={positionDataAttr}>
			<div className={styles.innerWrapper}>
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

				<Button
					type="submit"
					className={styles.submitButton}
					onClick={onSubmit}
				>
					{buttonText}
				</Button>
			</div>
		</div>
	);
};
