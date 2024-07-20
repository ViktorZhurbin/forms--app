import { EditableTextarea } from "@/shared/components/EditableTextarea/EditableTextarea";
import { useFormId } from "@/shared/hooks/useFormId";
import { useCurrentForm } from "@/shared/models/forms/read";
import { updateForm } from "@/shared/models/forms/write";
import { isDev } from "@/shared/utils/env";
import { DarkModeToggle } from "~/components/DarkModeToggle/DarkModeToggle";
import { CopyLinkButton } from "./CopyLinkButton/CopyLinkButton";
import styles from "./Header.module.css";
import { HomeButton } from "./HomeButton/HomeButton";
import { OpenFormButton } from "./OpenFormButton/OpenFormButton";
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
				<EditableTextarea
					tooltip="Rename"
					initialValue={form?.name}
					onChange={onChangeTitle}
				/>
			</div>
			<div className={styles.wrapper}>
				<PublishButton />
				<PreviewButton />
				<CopyLinkButton />
				{isDev && <OpenFormButton />}
				<DarkModeToggle />
			</div>
		</div>
	);
};
