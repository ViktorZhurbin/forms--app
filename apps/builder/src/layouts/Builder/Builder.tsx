import { useCurrentFormQuery } from "@/shared/models/forms/read";
import { NotFound } from "../NotFound/NotFound";
import { Header } from "./Header/Header";
import { BuilderBase } from "./components/BuilderBase/BuilderBase";

export const Builder = () => {
	const { data } = useCurrentFormQuery();

	const formNotFound = data?.forms.length === 0;

	if (formNotFound) {
		return <NotFound />;
	}

	return <BuilderBase header={<Header />} />;
};
