import type { TForm } from "@/shared/models/forms/schema/forms";

interface FormViewProps extends Pick<TForm, "nanoid" | "name"> {
	href: string;
	className: string;
	responsesText: string;
	getDeleteButton: ({ nanoid }: { nanoid: TForm["nanoid"] }) => JSX.Element;
}

export type { FormViewProps };
