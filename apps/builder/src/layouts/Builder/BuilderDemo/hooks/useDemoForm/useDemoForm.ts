import { useLocalDemoNanoId } from "@/shared/hooks/useLocalDemoNanoId";
import { useCurrentFormQuery } from "@/shared/models/forms/read";
import { createForm } from "@/shared/models/forms/write";
import { useEffect } from "react";

export const useDemoForm = () => {
	const { data, isLoading, error } = useCurrentFormQuery();

	const [, setDemoLocalNanoId, removeDemoLocalNanoId] = useLocalDemoNanoId();

	useEffect(() => {
		if (isLoading) return;

		if (error || !data?.forms.length) {
			removeDemoLocalNanoId();

			createForm({ isDemo: true }).then((nanoid) => {
				setDemoLocalNanoId(nanoid);
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
