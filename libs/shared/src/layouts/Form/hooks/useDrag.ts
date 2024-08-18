import { type DragEventHandler, useCallback, useRef, useState } from "react";

export const useDrag = (params: {
	goNext: () => void;
	goBack: () => void;
}) => {
	const { goNext, goBack } = params;

	const [isDragging, setIsDragging] = useState(false);
	const timeoutId = useRef<ReturnType<typeof setTimeout>>();

	const onWheel: DragEventHandler<HTMLDivElement> = useCallback(
		(event) => {
			if (isDragging) return;

			setIsDragging(true);

			// TODO
			if (event) {
				goNext();
			} else {
				goBack();
			}

			clearTimeout(timeoutId.current);
			timeoutId.current = setTimeout(() => {
				setIsDragging(false);
			}, 2000);
		},
		[isDragging, goNext, goBack],
	);

	return onWheel;
};
