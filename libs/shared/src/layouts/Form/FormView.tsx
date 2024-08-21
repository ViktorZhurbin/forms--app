import { type KeyboardEventHandler, useState } from "react";
import { DarkModeToggle } from "~/components/DarkModeToggle/DarkModeToggle";
import { Slider } from "~/components/slider/Slider/Slider";
import { useIsPreview } from "~/hooks/searchParams/useIsPreview";
import type { TField, TFieldEnding } from "~/models/field/schema";
import type { TResponse } from "~/models/response/schema";
import styles from "./FormView.module.css";
import { FormViewContent } from "./FormViewContent";

type FormViewProps = {
	fields: TField[];
	endings: TFieldEnding[];
	response?: TResponse;
	exitButton?: React.ReactElement;
};

export const FormView = ({
	fields,
	endings,
	response,
	exitButton,
}: FormViewProps) => {
	const isPreview = useIsPreview();
	const [themeTabIndex, setThemeTabIndex] = useState(-1);

	const handleFirstTab: KeyboardEventHandler<HTMLDivElement> = (e) => {
		if (themeTabIndex !== 0 && e.key === "Tab") {
			setThemeTabIndex(0);
		}
	};

	return (
		<div className={styles.container} onKeyDown={handleFirstTab}>
			<div className={styles.topFixed}>
				{isPreview && exitButton ? (
					exitButton
				) : (
					<DarkModeToggle tabIndex={themeTabIndex} />
				)}
			</div>

			<Slider>
				<FormViewContent
					fields={fields}
					endings={endings}
					response={response}
				/>
			</Slider>
		</div>
	);
};
