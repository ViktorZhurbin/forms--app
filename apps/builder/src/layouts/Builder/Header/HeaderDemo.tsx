import { EditableTextarea } from "@/shared/components/EditableTextarea/EditableTextarea";
import { useFormNanoId } from "@/shared/hooks/useFormNanoId";
import { useCurrentForm } from "@/shared/models/forms/read";
import { updateForm } from "@/shared/models/forms/write";
import { DarkModeToggle } from "~/components/DarkModeToggle/DarkModeToggle";
import styles from "./Header.module.css";
import { PreviewButton } from "./PreviewButton/PreviewButton";
import { PublishButton } from "./PublishButton/PublishButton";

export const HeaderDemo = () => {
	const formNanoId = useFormNanoId();
	const form = useCurrentForm();

	const onChangeTitle = (name: string) => {
		updateForm({ nanoid: formNanoId, name });
	};

	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<EditableTextarea
					tooltip="Rename"
					initialValue={form?.name}
					onChange={onChangeTitle}
				/>
			</div>
			<div className={styles.wrapper}>
				<PublishButton />
				<PreviewButton />
				<DarkModeToggle />
			</div>
		</div>
	);
};
