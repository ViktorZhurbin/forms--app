import type { OptionType } from "~/mocks/options";
import { EditableButtonOld } from "../EditableButtonOld/EditableButtonOld";
import styles from "./MultipleChoice.module.css";

type MultipleChoiceProps = {
	readOnly?: boolean;
	options: OptionType[];
};

export const MultipleChoice = ({ options, readOnly }: MultipleChoiceProps) => {
	return (
		<div className={styles.wrapper}>
			{options.map(({ id, text }) => (
				<EditableButtonOld
					key={id}
					readOnly={readOnly}
					variant="outline"
					buttonText={text}
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
