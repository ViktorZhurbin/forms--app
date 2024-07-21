import { useCurrentFormQuery } from "@/shared/models/forms/read";
import { Header } from "./Header/Header";
import { NotFound } from "./NotFound/NotFound";
import { BuilderBase } from "./components/BuilderBase";

export const Builder = () => {
	const { data } = useCurrentFormQuery();

	const formNotFound = data?.forms.length === 0;

	if (formNotFound) {
		return <NotFound />;
	}

	return <BuilderBase header={<Header />} />;
};
