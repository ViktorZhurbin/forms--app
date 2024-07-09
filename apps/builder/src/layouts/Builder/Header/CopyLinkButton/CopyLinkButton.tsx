import { CopyButton } from "@mantine/core";
import { IconLink } from "@tabler/icons-react";
import { HeaderIconButton } from "../../components/HeaderIconButton/HeaderIconButton";
import { useFormUrl } from "../../hooks/useFormUrl";

export const CopyLinkButton = () => {
	const url = useFormUrl();

	return (
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
	);
};
