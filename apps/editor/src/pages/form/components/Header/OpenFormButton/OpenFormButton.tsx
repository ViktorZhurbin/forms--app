import { HeaderIconButton } from "@/shared/components/HeaderIconButton/HeaderIconButton";
import { useFormPublishedFields } from "@/shared/models/field/read";
import { IconExternalLink } from "@tabler/icons-react";
import { useFormUrl } from "~/pages/form/hooks/useFormUrl";

export const OpenFormButton = () => {
	const url = useFormUrl();
	const fields = useFormPublishedFields();

	const isDisabled = !fields?.length || !url;

	return (
		url && (
			<HeaderIconButton
				disabled={isDisabled}
				tooltip="Open form"
				icon={<IconExternalLink />}
				onClick={() => {
					window.open(url, "_blank");
				}}
			/>
		)
	);
};
