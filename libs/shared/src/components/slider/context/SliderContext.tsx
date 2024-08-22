import {
	type PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import type { ErrorType } from "~/constants/fieldError";
import { SliderIds } from "../constants";

type SliderContextValue = {
	isEnd: boolean;
	isBeginning: boolean;
	activeIndex: number;
	lastIndex: number;

	slidePrev: () => void;
	slideNext: (skipErrorCheck?: boolean) => void;
	slideTo: (index: number) => void;

	showError: boolean;
	setShowError: (value: boolean) => void;

	errorType: ErrorType | null;
	setErrorType: (value: ErrorType | null) => void;
};

const SliderContext = createContext<SliderContextValue | undefined>(undefined);

const SliderProvider = (props: PropsWithChildren) => {
	const [isEnd, setIsEnd] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isBeginning, setIsBeginning] = useState(true);

	const [lastIndex, setLastIndex] = useState<number>(0);

	const [showError, setShowError] = useState(false);
	const [errorType, setErrorType] = useState<ErrorType | null>(null);

	useEffect(() => {
		const sliderEl = document.getElementById(SliderIds.root);

		if (!sliderEl) return;

		const slidesCount = sliderEl.querySelectorAll(`#${SliderIds.item}`).length;
		const lastIndex = slidesCount > 0 ? slidesCount - 1 : 0;

		setLastIndex(lastIndex);
	}, []);

	useEffect(() => {
		setIsBeginning(activeIndex === 0);
		setIsEnd(activeIndex === lastIndex);
	}, [activeIndex, lastIndex]);

	const slideTo = useCallback(
		(index: number, options: { skipErrorCheck?: boolean } = {}) => {
			if (index === activeIndex || index < 0 || index > lastIndex) return;

			if (index > activeIndex && errorType && !options.skipErrorCheck) {
				setShowError(true);
				return;
			}

			setShowError(false);
			setErrorType(null);
			setActiveIndex(index);
		},
		[activeIndex, lastIndex, errorType],
	);

	const slideNext = useCallback(
		(skipErrorCheck = false) => {
			slideTo(activeIndex + 1, { skipErrorCheck });
		},
		[slideTo, activeIndex],
	);

	const slidePrev = useCallback(() => {
		slideTo(activeIndex - 1);
	}, [slideTo, activeIndex]);

	const value: SliderContextValue = {
		isEnd,
		isBeginning,
		activeIndex,
		lastIndex,

		slideNext,
		slidePrev,
		slideTo,

		errorType,
		setErrorType,

		showError,
		setShowError,
	};

	return (
		<SliderContext.Provider value={value}>
			{props.children}
		</SliderContext.Provider>
	);
};

const useSlider = () => {
	const context = useContext(SliderContext);

	if (context === undefined) {
		throw new Error("useSlider must be used within a SliderProvider");
	}

	return context;
};

export type { SliderContextValue };
export { useSlider, SliderProvider };
