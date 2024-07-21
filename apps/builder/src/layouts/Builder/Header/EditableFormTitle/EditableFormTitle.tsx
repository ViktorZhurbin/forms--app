import { useFormNanoId } from "@/shared/hooks/useFormNanoId";
import { useCurrentForm } from "@/shared/models/forms/read";
import { updateForm } from "@/shared/models/forms/write";
import { TextInput, Tooltip } from "@mantine/core";

export const EditableFormTitle = () => {
	const form = useCurrentForm();
	const formNanoId = useFormNanoId();

	const onChange = (name: string) => {
		updateForm({ nanoid: formNanoId, name });
	};

	return (
		<Tooltip withArrow label="Rename form">
			<TextInput
				value={form?.name ?? ""}
				onChange={(event) => {
					onChange?.(event.currentTarget.value);
				}}
			/>
		</Tooltip>
	);
};
