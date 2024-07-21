import { HeaderDemo } from "../Header/HeaderDemo";
import { BuilderBase } from "../components/BuilderBase";
import { useDemoForm } from "./hooks/useDemoForm";

export const BuilderDemo = () => {
	useDemoForm();

	return <BuilderBase header={<HeaderDemo />} />;
};
