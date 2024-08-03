import { CopyButton } from "@mantine/core";
import { IconLink } from "@tabler/icons-react";
import { useFormUrl } from "~/pages/form/hooks/useFormUrl";
import { HeaderIconButton } from "../HeaderIconButton/HeaderIconButton";

export const CopyLinkButton = () => {
	const url = useFormUrl();

	return (
		url && (
			<CopyButton value={url} timeout={2000}>
				{({ copied, copy }) => (
					<HeaderIconButton
						disabled={!url}
						tooltip={copied ? "Copied!" : "Copy form link"}
						icon={<IconLink />}
						onClick={copy}
					/>
				)}
			</CopyButton>
		)
	);
};