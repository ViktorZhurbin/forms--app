import { useLocalDemoNanoId } from "@/shared/hooks/useLocalDemoNanoId";
import { useCurrentFormQuery } from "@/shared/models/form/read";
import { createForm } from "@/shared/models/form/write";
import { useEffect } from "react";

export const useDemoForm = () => {
	const { data, isLoading, error } = useCurrentFormQuery();

	const [, setDemoLocalNanoId, removeDemoLocalNanoId] = useLocalDemoNanoId();

	useEffect(() => {
		if (isLoading) return;

		if (error || !data?.forms.length) {
			removeDemoLocalNanoId();

			createForm({ isDemo: true }).then((nanoId) => {
				setDemoLocalNanoId(nanoId);
			});
		}
	}, [
		isLoading,
		error,
		data?.forms.length,
		setDemoLocalNanoId,
		removeDemoLocalNanoId,
	]);

	return {
		error,
		isLoading: isLoading || !data?.forms.length,
	};
};
