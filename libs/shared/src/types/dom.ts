import type { ActionIconProps } from "@mantine/core";
import type { HTMLAttributes } from "react";

type HTMLButtonProps = HTMLAttributes<HTMLButtonElement>;

interface ActionButtonProps
	extends Omit<HTMLButtonProps, "color" | "style">,
		ActionIconProps {}

export type { ActionButtonProps, HTMLButtonProps };
