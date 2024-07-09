import type { HTMLButtonProps } from "@/shared/types/dom";
import { ActionIcon, type ActionIconProps, Tooltip } from "@mantine/core";

interface HeaderIconButtonProps extends HTMLButtonProps, ActionIconProps {
	tooltip: string;
	icon: React.ReactElement;
}

export const HeaderIconButton = (props: HeaderIconButtonProps) => {
	const { icon, tooltip, disabled, onClick } = props;

	return (
		<Tooltip withArrow label={tooltip} disabled={disabled}>
			<ActionIcon
				size="lg"
				variant="default"
				disabled={disabled}
				onClick={onClick}
			>
				{icon}
			</ActionIcon>
		</Tooltip>
	);
};
