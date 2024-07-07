import { DarkModeToggle } from "~/components/DarkModeToggle/DarkModeToggle";
import { EditableText } from "~/components/Question/EditableText/EditableText";
import { useCurrentForm } from "~/models/forms/read";
import { updateForm } from "~/models/forms/write";
import { useFormId } from "../hooks/useFormId";
import styles from "./Header.module.css";
import { HomeButton } from "./HomeButton/HomeButton";
import { PreviewButton } from "./PreviewButton/PreviewButton";
import { PublishButton } from "./PublishButton/PublishButton";

export const Header = () => {
	const formId = useFormId();
	const form = useCurrentForm();

	const onChangeTitle = (name: string) => {
		updateForm({ id: formId, name });
	};

	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<HomeButton />
				<EditableText
					tooltip="Rename"
					initialValue={form?.name}
					onChange={onChangeTitle}
				/>
			</div>
			<div className={styles.wrapper}>
				<PreviewButton />
				<PublishButton />
				<DarkModeToggle />
			</div>
		</div>
	);
};