import { useParams } from "wouter";

export const useFormNanoId = () => {
	// if no nanoid, the route won't be rendered
	const formNanoId = useParams<{ nanoid: string }>()?.nanoid;

	return formNanoId;
};
