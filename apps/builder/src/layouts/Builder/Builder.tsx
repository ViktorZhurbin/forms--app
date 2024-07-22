import { useCurrentFormQuery } from "@/shared/models/forms/read";
import { useMediaQuery } from "@mantine/hooks";
import { NotFound } from "../NotFound/NotFound";
import { Header } from "./Header/Header";
import { SmallScreen } from "./SmallScreen/SmallScreen";
import { BuilderBase } from "./components/BuilderBase";

export const Builder = () => {
	const { data } = useCurrentFormQuery();
	const isTooSmall = useMediaQuery("(max-width: 768px)");

	if (isTooSmall) {
		return <SmallScreen />;
	}

	const formNotFound = data?.forms.length === 0;

	if (formNotFound) {
		return <NotFound />;
	}

	return <BuilderBase header={<Header />} />;
};
