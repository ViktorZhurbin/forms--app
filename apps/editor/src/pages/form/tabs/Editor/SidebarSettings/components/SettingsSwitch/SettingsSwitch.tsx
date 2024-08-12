import { mergeClassNames } from "@/shared/utils/classNames";
import { Switch, type SwitchProps } from "@mantine/core";
import styles from "./SettingsSwitch.module.css";

export const SettingsSwitch = (props: SwitchProps) => {
	return (
		<Switch
			{...props}
			labelPosition="left"
			classNames={mergeClassNames(styles, props.classNames)}
		/>
	);
};
