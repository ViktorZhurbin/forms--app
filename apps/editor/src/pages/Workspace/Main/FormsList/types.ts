import type { TForm } from "@/shared/models/form/schema/form";

interface FormViewProps extends Pick<TForm, "name"> {
	href: string;
	className: string;
	responsesText: string;
	deleteButton: React.ReactElement;
}

export type { FormViewProps };
