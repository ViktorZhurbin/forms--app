import { createUseGesture, dragAction, wheelAction } from "@use-gesture/react";

const useGesture = createUseGesture([dragAction, wheelAction]);

type UseFormGesturesParams = {
	goToNextStep: () => void;
	goToPreviousStep: () => void;
};

export const useFormGestures = ({
	goToNextStep,
	goToPreviousStep,
}: UseFormGesturesParams) => {
	const bind = useGesture(
		{
			onDragEnd: ({ swipe: [swipeX, swipeY], direction: [dx, dy] }) => {
				console.log({ swipeX, swipeY, dx, dy });

				if (dy > 0) {
					goToPreviousStep();
				} else if (dy < 0) {
					goToNextStep();
				}
			},
			onWheelStart: ({ movement, axis, direction: [dx, dy] }) => {
				console.log({ axis, movement, dx, dy });

				if (dy > 0) {
					goToNextStep();
				} else if (dy < 0) {
					goToPreviousStep();
				}
			},
		},
		{ wheel: { axis: "y" }, drag: { axis: "y" } },
	);

	return bind;
};
