import { TextInput } from "@mantine/core";
import { CopyButtonWithTooltip } from "~/components/CopyButtonWithTooltip/CopyButtonWithTooltip";

export const CopyLinkInput = ({ url }: { url: string }) => {
	return (
		<div>
			<TextInput
				readOnly
				value={url}
				label="Send the link to your device with a larger screen"
				rightSection={<CopyButtonWithTooltip url={url} />}
			/>
		</div>
	);
};
