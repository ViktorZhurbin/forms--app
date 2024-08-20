import { ActionIcon, Tooltip } from "@mantine/core";
import type { ActionButtonProps } from "~/types/dom";

interface IconButtonProps extends ActionButtonProps {
	tooltip?: string;
}

export const IconButton = (props: IconButtonProps) => {
	const { tooltip, ...buttonProps } = props;

	const content = <ActionIcon size="lg" variant="default" {...buttonProps} />;

	if (!tooltip) {
		return content;
	}

	return (
		<Tooltip withArrow label={tooltip} disabled={buttonProps.disabled}>
			{content}
		</Tooltip>
	);
};
