import { type TouchEventHandler, useCallback, useState } from "react";

type TouchHandler = TouchEventHandler<HTMLElement>;

export const useSwipe = (params: {
	goNext: () => void;
	goBack: () => void;
}) => {
	const { goNext, goBack } = params;

	const [startY, setStartY] = useState<number>();

	const onTouchStart: TouchHandler = useCallback((event) => {
		if (event.touches.length !== 1) return;

		setStartY(event.touches[0].clientY);
	}, []);

	const onTouchEnd: TouchHandler = useCallback(
		(event) => {
			if (event.changedTouches.length !== 1) return;

			const endY = event.changedTouches[0].clientY;

			if (!startY || !endY) return;

			if (endY < startY) {
				goNext();
			} else if (endY > startY) {
				goBack();
			}
		},
		[startY, goNext, goBack],
	);

	return {
		onTouchEnd,
		onTouchStart,
	};
};
