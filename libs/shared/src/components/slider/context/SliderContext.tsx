import {
	type PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { SliderIds } from "../constants";

type SliderContextValue = {
	isEnd: boolean;
	activeIndex: number;
	isBeginning: boolean;

	slidePrev: () => void;
	slideNext: () => void;

	isAnswerRequired: boolean;
	setAnswerRequired: (value: boolean) => void;
};

const SliderContext = createContext<SliderContextValue | undefined>(undefined);

const SliderProvider = (props: PropsWithChildren) => {
	const [slides, setSlides] = useState<HTMLElement[]>([]);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isAnswerRequired, setAnswerRequired] = useState(false);

	useEffect(() => {
		const sliderEl = document.getElementById(SliderIds.root);

		if (!sliderEl) return;

		const slides = sliderEl.querySelectorAll<HTMLElement>(`#${SliderIds.item}`);

		setSlides(Array.from(slides));
	}, []);

	const isBeginning = activeIndex === 0;
	const isEnd = activeIndex === slides.length - 1;

	const slideNext = () => {
		if (isEnd) return;

		setActiveIndex(activeIndex + 1);
	};

	const slidePrev = () => {
		if (isBeginning) return;

		setActiveIndex(activeIndex - 1);
	};

	const value = {
		isEnd,
		isBeginning,
		activeIndex,

		slideNext,
		slidePrev,

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
