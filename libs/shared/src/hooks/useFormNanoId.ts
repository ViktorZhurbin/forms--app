import { useParams } from "wouter";
import { useLocalDemoNanoId } from "./useLocalDemoNanoId";

export const useFormNanoId = () => {
	const params = useParams();
	const [demoLocalNanoId] = useLocalDemoNanoId();

	return params?.formNanoId ?? demoLocalNanoId ?? "";
};
