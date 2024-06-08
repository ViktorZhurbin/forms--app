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
				<h1 className={styles.header}>{field.title}</h1>

				<div className={styles.optionWrapper}>
					{field.options.map((option) => (
						<button
							key={option}
							className="outline"
							onClick={() => {
								console.log("click");
							}}
						>
							{option}
						</button>
					))}
				</div>

				<button className={styles.submitButton} onClick={onSubmit}>
					{buttonText}
				</button>
			</div>
		</div>
	);
};
