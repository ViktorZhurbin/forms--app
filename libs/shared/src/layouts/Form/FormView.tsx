import { DarkModeToggle } from "~/components/DarkModeToggle/DarkModeToggle";
import { Slider } from "~/components/slider/Slider/Slider";
import { useIsPreview } from "~/hooks/useIsPreview";
import type { TField } from "~/models/field/schema";
import type { TResponse } from "~/models/response/schema";
import styles from "./FormView.module.css";
import { FormViewContent } from "./FormViewContent";

type FormViewProps = {
	fields: TField[];
	response?: TResponse;
	exitButton?: React.ReactElement;
};

export const FormView = ({ fields, response, exitButton }: FormViewProps) => {
	const isPreview = useIsPreview();

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
