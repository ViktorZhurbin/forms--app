import { IconButton } from "@/shared/components/IconButton/IconButton";
import { CopyButton } from "@mantine/core";
import { IconLink } from "@tabler/icons-react";
import { useFormUrl } from "~/pages/form/hooks/useFormUrl";

export const CopyLinkButton = () => {
	const url = useFormUrl();

	return (
		url && (
			<CopyButton value={url} timeout={2000}>
				{({ copied, copy }) => (
					<IconButton
						disabled={!url}
						tooltip={copied ? "Copied!" : "Copy form link"}
						onClick={copy}
					>
						<IconLink />
					</IconButton>
				)}
			</CopyButton>
		)
	);
};
