import { ActionIcon, type ActionIconProps, Tooltip } from "@mantine/core";
import type { HTMLButtonProps } from "~/types/dom";

interface HeaderIconButtonProps extends HTMLButtonProps, ActionIconProps {
	tooltip?: string;
	icon: React.ReactElement;
}

export const HeaderIconButton = (props: HeaderIconButtonProps) => {
	const { icon, tooltip, disabled, onClick, ...rest } = props;

	const content = (
		<ActionIcon
			{...rest}
			size="lg"
			variant="default"
			disabled={disabled}
			onClick={onClick}
		>
			{icon}
		</ActionIcon>
	);

	if (!tooltip) {
		return content;
	}

	return (
		<Tooltip withArrow label={tooltip} disabled={disabled}>
			{content}
		</Tooltip>
	);
};
