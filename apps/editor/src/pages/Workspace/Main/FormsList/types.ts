import type { TForm } from "@/shared/models/form/schema/form";
import type { ButtonProps, MantineSize } from "@mantine/core";
import type { Link } from "wouter";

interface FormViewProps {
	formName: TForm["name"];
	responsesText: string;
	buttonProps: {
		href: string;
		size: MantineSize;
		variant: ButtonProps["variant"];
		component: typeof Link;
	};
}

export type { FormViewProps };
