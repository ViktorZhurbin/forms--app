import type { Block } from "../../constants/blockTypes";
import styles from "./BlockItem.module.css";

type BlockItemProps = {
	block: Block;
	stepNumber: number;
	isLast: boolean;
	onSubmitForm: () => void;
	goToNextStep: () => void;
};

export const BlockItem = ({
	block,
	stepNumber,
	isLast,
	onSubmitForm,
	goToNextStep,
}: BlockItemProps) => {
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
			<h1 className={styles.header}>
				{stepNumber}. {block.question}
			</h1>

			<div className={`container ${styles.optionWrapper}`}>
				{block.options.map((option) => (
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
	);
};
