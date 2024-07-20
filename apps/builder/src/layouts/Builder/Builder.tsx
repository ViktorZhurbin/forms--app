import { useCurrentFormQuery } from "@/shared/models/forms/read";
import { BuilderBase } from "./BuilderBase";
import { Header } from "./Header/Header";
import { NotFound } from "./NotFound/NotFound";

export const Builder = () => {
	const { data } = useCurrentFormQuery();

	const formNotFound = data?.forms.length === 0;

	if (formNotFound) {
		return <NotFound />;
	}

	return <BuilderBase header={<Header />} />;
};
