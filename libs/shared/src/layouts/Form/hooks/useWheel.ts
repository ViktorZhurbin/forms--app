import { type WheelEventHandler, useCallback, useRef, useState } from "react";

export const useWheel = (params: {
	goNext: () => void;
	goBack: () => void;
}) => {
	const { goNext, goBack } = params;

	const [isScrolling, setIsScrolling] = useState(false);
	const timeoutId = useRef<ReturnType<typeof setTimeout>>();

	const onWheel: WheelEventHandler<HTMLDivElement> = useCallback(
		(event) => {
			if (isScrolling) return;

			setIsScrolling(true);

			if (event.deltaY > 0) {
				goNext();
			} else if (event.deltaY < 0) {
				goBack();
			} else {
				setIsScrolling(false);
				return;
			}

			clearTimeout(timeoutId.current);
			timeoutId.current = setTimeout(() => {
				setIsScrolling(false);
			}, 2000);
		},
		[goBack, goNext, isScrolling],
	);

	return onWheel;
};
