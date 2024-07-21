import { EditableTextarea } from "@/shared/components/EditableTextarea/EditableTextarea";
import { useFormNanoId } from "@/shared/hooks/useFormNanoId";
import { useCurrentForm } from "@/shared/models/forms/read";
import { updateForm } from "@/shared/models/forms/write";

export const EditableFormTitle = () => {
	const form = useCurrentForm();
	const formNanoId = useFormNanoId();

	const onChangeTitle = (name: string) => {
		updateForm({ nanoid: formNanoId, name });
	};

	return (
		<EditableTextarea
			tooltip="Rename"
			initialValue={form?.name}
			onChange={onChangeTitle}
		/>
	);
};
