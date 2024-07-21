import { useCurrentForm } from "@/shared/models/forms/read";
import { IconExternalLink } from "@tabler/icons-react";
import { HeaderIconButton } from "../../components/HeaderIconButton/HeaderIconButton";
import { useFormUrl } from "../../hooks/useFormUrl";

export const OpenFormButton = () => {
	const url = useFormUrl();
	const form = useCurrentForm();

	const isDisabled = !form?.questions.length || !url;

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
