import { ColorSchemeToggle } from "~/components/ColorSchemeToggle/ColorSchemeToggle";
import { EditableText } from "~/components/Question/EditableText/EditableText";
import { useDbQuery } from "~/models/db";
import { updateForm } from "~/models/methods";
import { useFormId } from "../hooks/useFormId";
import styles from "./Header.module.css";
import { HomeButton } from "./HomeButton/HomeButton";
import { PreviewButton } from "./PreviewButton/PreviewButton";
import { PublishButton } from "./PublishButton/PublishButton";

export const Header = () => {
	const formId = useFormId();

	const { data } = useDbQuery({
		forms: {
			$: { where: { id: formId } },
		},
	});

	const onChangeTitle = (name: string) => {
		updateForm({ id: formId, name });
	};

	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<HomeButton />
				<EditableText
					initialValue={data?.forms[0].name}
					onChange={onChangeTitle}
				/>
			</div>
			<div className={styles.wrapper}>
				<ColorSchemeToggle />
				<PreviewButton />
				<PublishButton />
			</div>
		</div>
	);
};
