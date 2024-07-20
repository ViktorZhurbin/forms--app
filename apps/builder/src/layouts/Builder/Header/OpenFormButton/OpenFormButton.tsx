import { IconExternalLink } from "@tabler/icons-react";
import { HeaderIconButton } from "../../components/HeaderIconButton/HeaderIconButton";
import { useFormUrl } from "../../hooks/useFormUrl";

export const OpenFormButton = ({ disabled }: { disabled: boolean }) => {
	const url = useFormUrl();

	return (
		<HeaderIconButton
			disabled={disabled || !url}
			tooltip="Open form"
			icon={<IconExternalLink />}
			onClick={() => {
				window.open(url, "_blank");
			}}
		/>
	);
};
