import { useParams } from "wouter";
import { useLocalDemoNanoId } from "./useLocalDemoNanoId";

export const useFormNanoId = () => {
	const [demoLocalNanoId] = useLocalDemoNanoId();

	return useParams()?.formId ?? demoLocalNanoId ?? "";
};
