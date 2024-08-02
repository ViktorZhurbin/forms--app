import { useFormNanoId } from "@/shared/hooks/useFormNanoId";
import { useCurrentForm } from "@/shared/models/form/read";
import { updateForm } from "@/shared/models/form/write";
import { TextInput, Tooltip } from "@mantine/core";

export const EditableFormTitle = () => {
	const form = useCurrentForm();
	const formNanoId = useFormNanoId();

	const handleEdit = (name: string) => {
		updateForm({ nanoId: formNanoId, name });
	};

	return (
		<Tooltip withArrow label="Rename form">
			<TextInput
				defaultValue={form?.name ?? ""}
				onBlur={(event) => {
					handleEdit?.(event.currentTarget.value);
				}}
			/>
		</Tooltip>
	);
};
