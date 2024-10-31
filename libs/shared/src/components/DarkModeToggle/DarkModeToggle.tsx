import { useMantineColorScheme } from "@mantine/core";
import { IconButton } from "../IconButton/IconButton";
import { useNextMode } from "./useNextMode";

export const DarkModeToggle = (props: { tabIndex?: number }) => {
	const { tabIndex } = props;

	const { setColorScheme } = useMantineColorScheme();
	const { colorScheme, Icon, tooltip } = useNextMode();

	const toggleColorScheme = () => {
		setColorScheme(colorScheme);
	};

	return (
		<IconButton
			tooltip={tooltip}
			tabIndex={tabIndex}
			onClick={toggleColorScheme}
		>
			<Icon />
		</IconButton>
	);
};
