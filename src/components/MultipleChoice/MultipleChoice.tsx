import { useSetCellCallback } from "tinybase/ui-react";
import type { OptionType } from "~/mocks/options";
import { EditableButtonOld } from "../EditableButtonOld/EditableButtonOld";
import styles from "./MultipleChoice.module.css";

type MultipleChoiceProps = {
	readOnly?: boolean;
	options: OptionType[];
};

export const MultipleChoice = ({ options, readOnly }: MultipleChoiceProps) => {
	const onChangeText = (id: string) =>
		useSetCellCallback("options", id, "text", (value: string) => value);

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
