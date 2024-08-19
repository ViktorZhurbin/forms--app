import {
	type PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { SliderIds } from "../constants";
import { getIsWithinRange } from "./helpers/getIsInRange";

type SliderContextValue = {
	isEnd: boolean;
	activeIndex: number;
	isBeginning: boolean;

	slidePrev: () => void;
	slideNext: () => void;
	slideTo: (index: number) => void;

	isAnswerRequired: boolean;
	setAnswerRequired: (value: boolean) => void;
};

const SliderContext = createContext<SliderContextValue | undefined>(undefined);

const SliderProvider = (props: PropsWithChildren) => {
	const [slides, setSlides] = useState<HTMLElement[]>([]);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(false);
	const [isAnswerRequired, setAnswerRequired] = useState(false);

	useEffect(() => {
		const sliderEl = document.getElementById(SliderIds.root);

		if (!sliderEl) return;

		const slides = sliderEl.querySelectorAll<HTMLElement>(`#${SliderIds.item}`);

		setSlides(Array.from(slides));
	}, []);

	useEffect(() => {
		setIsBeginning(activeIndex === 0);
		setIsEnd(activeIndex === slides.length - 1);
	}, [activeIndex, slides.length]);

	const setIfWithinRange = useCallback(
		(index: number) => {
			if (getIsWithinRange(index, slides.length)) {
				setActiveIndex(index);
			}
		},
		[slides.length],
	);

	const slideNext = useCallback(() => {
		setIfWithinRange(activeIndex + 1);
	}, [setIfWithinRange, activeIndex]);

	const slidePrev = useCallback(() => {
		setIfWithinRange(activeIndex - 1);
	}, [setIfWithinRange, activeIndex]);

	const slideTo = useCallback(
		(index: number) => {
			const isActiveIndex = index === activeIndex;
			const isSlideBlocked = index > activeIndex && isAnswerRequired;

			if (isActiveIndex || isSlideBlocked) return;

			setIfWithinRange(index);
		},
		[setIfWithinRange, activeIndex, isAnswerRequired],
	);

	const value: SliderContextValue = {
		isEnd,
		isBeginning,
		activeIndex,

		slideNext,
		slidePrev,
		slideTo,

		isAnswerRequired,
		setAnswerRequired,
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
