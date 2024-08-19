import { type PropsWithChildren, createContext, useContext } from "react";
import type { getSlidePosition } from "../SlideItem/helpers/getSlidePosition";

type SlideItemContextValue = {
	isActive: boolean;
	isPrev: boolean;
	isNext: boolean;
	slideIndex: number;
};

const SlideItem = createContext<SlideItemContextValue | undefined>(undefined);

const SlideItemProvider = (
	props: PropsWithChildren<{
		index: number;
		position: ReturnType<typeof getSlidePosition>;
	}>,
) => {
	const { index, position, children } = props;

	const isActive = position === "active";
	const isPrev = position === "previous";
	const isNext = position === "next";

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
