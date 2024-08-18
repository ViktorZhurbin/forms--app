import { DarkModeToggle } from "~/components/DarkModeToggle/DarkModeToggle";
import { Slider } from "~/components/slider/Slider/Slider";
import type { TField } from "~/models/field/schema";
import type { TResponse } from "~/models/response/schema";
import styles from "./FormView.module.css";
import { FormViewContent } from "./FormViewContent";

type FormViewProps = {
	fields: TField[];
	response?: TResponse;
	isPreview?: boolean;
	exitButton?: React.ReactElement;
};

export const FormView = ({
	fields,
	response,
	exitButton,
	isPreview,
}: FormViewProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.topFixed}>
				{isPreview && exitButton ? exitButton : <DarkModeToggle />}
			</div>

			<Slider>
				<FormViewContent fields={fields} response={response} />
			</Slider>
		</div>
	);
};
