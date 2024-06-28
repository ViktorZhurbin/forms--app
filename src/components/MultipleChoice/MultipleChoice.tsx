import type { ChoiceType } from "~/constants/questions";
import { EditableButtonOld } from "../EditableButtonOld/EditableButtonOld";
import styles from "./MultipleChoice.module.css";

type MultipleChoiceProps = {
	readOnly?: boolean;
	options: ChoiceType["options"];
};

export const MultipleChoice = ({ options, readOnly }: MultipleChoiceProps) => {
	const onChangeText = (id: string) => undefined;
	// useSetCellCallback("options", id, "text", (value: string) => value);

	return (
		<div className={styles.wrapper}>
			{options.map(({ id, text }) => {
				return (
					<EditableButtonOld
						key={id}
						readOnly={readOnly}
						variant="outline"
						buttonText={text}
						classNames={{
							textInput: styles.textInput,
						}}
						onChange={onChangeText(id)}
						onClick={() => {
							console.log("click");
						}}
					/>
				);
			})}
		</div>
	);
};
