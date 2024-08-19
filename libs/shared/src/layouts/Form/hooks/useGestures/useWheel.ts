import { type WheelEventHandler, useCallback, useRef, useState } from "react";

export const useWheel = (params: {
	goNext: () => void;
	goBack: () => void;
}) => {
	const { goNext, goBack } = params;

	const [isWheeling, setIsWheeling] = useState(false);
	const timeoutId = useRef<ReturnType<typeof setTimeout>>();

	const onWheel: WheelEventHandler<HTMLDivElement> = useCallback(
		(event) => {
			if (isWheeling) return;

			setIsWheeling(true);

			if (event.deltaY > 0) {
				goNext();
			} else if (event.deltaY < 0) {
				goBack();
			} else {
				setIsWheeling(false);
				return;
			}

			clearTimeout(timeoutId.current);
			timeoutId.current = setTimeout(() => {
				setIsWheeling(false);
			}, 2000);
		},
		[goBack, goNext, isWheeling],
	);

	return { onWheel };
};
