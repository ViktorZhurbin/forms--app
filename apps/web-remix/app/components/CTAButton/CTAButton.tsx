import {
	Button,
	type ButtonProps,
	type PolymorphicComponentProps,
} from "@mantine/core";
import clsx from "clsx";

import styles from "./CTAButton.module.css";

export const CTAButton = <C extends "a" | "button" = "button">(
	props: PolymorphicComponentProps<C, ButtonProps>,
) => {
	const classNames = clsx(styles.button, props.className);

	return (
		<Button {...props} className={classNames}>
			Create a form
		</Button>
	);
};
