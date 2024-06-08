import type { FormField } from "../../constants/form";
import { MultipleChoice } from "../MultipleChoice/MultipleChoice";
import { getPositionDataAttribute } from "./helpers/getPositionDataAttribute";

export const FormFields = (props: {
	formFields: FormField[];
	step: number;
	onSubmit: () => void;
	goToNextStep: () => void;
}) => {
	const { formFields, step, onSubmit, goToNextStep } = props;

	return (
		<>
			{formFields.map((field, index) => {
				return (
					<MultipleChoice
						key={field.id}
						field={field}
						isLast={index === formFields.length - 1}
						positionDataAttr={getPositionDataAttribute(index, step)}
						onSubmitForm={onSubmit}
						goToNextStep={goToNextStep}
					/>
				);
			})}
		</>
	);
};
