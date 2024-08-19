import {
	type Touch,
	type TouchEventHandler,
	useCallback,
	useState,
} from "react";

type TouchHandler = TouchEventHandler<HTMLElement>;

export const useSwipe = (params: {
	goNext: () => void;
	goBack: () => void;
}) => {
	const { goNext, goBack } = params;

	const [startTouch, setStartTouch] = useState<Touch | null>(null);

	const onTouchStart: TouchHandler = useCallback((event) => {
		if (event.touches.length !== 1) {
			setStartTouch(null);
			return;
		}

		setStartTouch(event.touches[0]);
	}, []);

	const onTouchEnd: TouchHandler = useCallback(
		(event) => {
			const changedTouch = event.changedTouches?.[0];

			if (
				!startTouch ||
				!changedTouch ||
				startTouch.identifier !== changedTouch.identifier
			) {
				return;
			}

			const startY = startTouch.clientY;
			const endY = changedTouch.clientY;

			if (endY < startY) {
				goNext();
			} else if (endY > startY) {
				goBack();
			}
		},
		[startTouch, goNext, goBack],
	);

	return {
		onTouchEnd,
		onTouchStart,
	};
};
