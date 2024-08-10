import { Switch } from "@mantine/core";
import styles from "./SettingsSwitch.module.css";

export const SettingsSwitch = (props: { label: string }) => {
	const { label } = props;

	return <Switch label={label} labelPosition="left" classNames={styles} />;
};
