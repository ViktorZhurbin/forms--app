import type { TForm } from "@/shared/models/forms/schema/forms";

interface FormViewProps extends Pick<TForm, "nanoId" | "name"> {
	href: string;
	className: string;
	responsesText: string;
	getDeleteButton: ({ nanoId }: { nanoId: TForm["nanoId"] }) => JSX.Element;
}

export type { FormViewProps };
