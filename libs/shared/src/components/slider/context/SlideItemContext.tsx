import { type PropsWithChildren, createContext, useContext } from "react";
import { useSlider } from "./SliderContext";

type SlideItemContextValue = {
	isActive: boolean;
	isPrev: boolean;
	isNext: boolean;
	slideIndex: number;
};

const SlideItem = createContext<SlideItemContextValue | undefined>(undefined);

const SlideItemProvider = (props: PropsWithChildren<{ index: number }>) => {
	const { index, children } = props;

	const { activeIndex } = useSlider();

	const isActive = activeIndex === index;
	const isPrev = activeIndex - 1 === index;
	const isNext = activeIndex + 1 === index;

	const value = {
		isActive,
		isPrev,
		isNext,
		slideIndex: index,
	};

	return <SlideItem.Provider value={value}>{children}</SlideItem.Provider>;
};

const useSlideItem = () => {
	const context = useContext(SlideItem);

	if (context === undefined) {
		throw new Error("useSlideItem must be used within a SlideItemProvider");
	}

	return context;
};

export type { SlideItemContextValue };
export { useSlideItem, SlideItemProvider };
