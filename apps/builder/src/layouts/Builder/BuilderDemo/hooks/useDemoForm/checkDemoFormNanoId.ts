import { LocalStorage } from "@/shared/constants/localStorage";
import { createForm } from "@/shared/models/forms/write";

const createAndSetFormNanoId = async () => {
	const nanoid = await createForm();

	localStorage.setItem(LocalStorage.DemoFormId, nanoid);

	return nanoid;
};

export const checkDemoFormNanoId = async () => {
	try {
		const demoLocalNanoId = localStorage.getItem(LocalStorage.DemoFormId);

		if (demoLocalNanoId) {
			return demoLocalNanoId;
		}

		return await createAndSetFormNanoId();
	} catch {
		return await createAndSetFormNanoId();
	}
};
