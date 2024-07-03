import { ColorSchemeToggle } from "~/components/ColorSchemeToggle/ColorSchemeToggle";
import { EditableText } from "~/components/Question/EditableText/EditableText";
import { useForm } from "~/models/forms/read";
import { updateForm } from "~/models/forms/write";
import { useFormId } from "../hooks/useFormId";
import styles from "./Header.module.css";
import { HomeButton } from "./HomeButton/HomeButton";
import { PreviewButton } from "./PreviewButton/PreviewButton";
import { PublishButton } from "./PublishButton/PublishButton";

export const Header = () => {
	const formId = useFormId();

	const { data } = useForm(formId);

	const onChangeTitle = (name: string) => {
		updateForm({ id: formId, name });
	};

	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<HomeButton />
				<EditableText
					initialValue={data?.forms[0]?.name}
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
