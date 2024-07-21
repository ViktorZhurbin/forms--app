import { useEffect } from "react";
import { checkDemoFormNanoId } from "./checkDemoFormNanoId";

export const useDemoForm = () => {
	useEffect(() => {
		checkDemoFormNanoId();
	}, []);
};
