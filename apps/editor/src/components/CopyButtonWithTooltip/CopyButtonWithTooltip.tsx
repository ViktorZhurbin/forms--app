import { ActionIcon, CopyButton, Tooltip } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

export const CopyButtonWithTooltip = ({ url }: { url: string }) => {
	return (
		<CopyButton value={url} timeout={2000}>
			{({ copied, copy }) => (
				<Tooltip withArrow position="right" label={copied ? "Copied" : "Copy"}>
					<ActionIcon
						color={copied ? "teal" : "gray"}
						variant="subtle"
						onClick={copy}
					>
						{copied ? <IconCheck /> : <IconCopy />}
					</ActionIcon>
				</Tooltip>
			)}
		</CopyButton>
	);
};
