import { DarkModeToggle } from "@/shared/components/DarkModeToggle/DarkModeToggle";
import { EditableText } from "@/shared/components/Question/EditableText/EditableText";
import { useFormId } from "@/shared/hooks/useFormId";
import { useCurrentForm } from "@/shared/models/forms/read";
import { updateForm } from "@/shared/models/forms/write";
import { CopyLinkButton } from "./CopyLinkButton/CopyLinkButton";
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
				<CopyLinkButton />
				<PublishButton />
				<DarkModeToggle />
			</div>
		</div>
	);
};
