import { SliderIds } from "../constants";
import { SlideItemProvider, useSlideItem } from "../context/SlideItemContext";
import styles from "./SlideItem.module.css";
import { getSlidePosition } from "./helpers/getSlidePosition";

const SlideContent = (props: React.PropsWithChildren) => {
	const { children } = props;

	const sideItemContextValue = useSlideItem();
	const position = getSlidePosition(sideItemContextValue);

	return (
		<div
			id={SliderIds.item}
			className={styles.root}
			data-slide-position={position}
			data-slide-index={sideItemContextValue.slideIndex}
		>
			{children}
		</div>
	);
};

export const SlideItem = (
	props: React.PropsWithChildren<{ index: number }>,
) => {
	const { children, index } = props;

	return (
		<SlideItemProvider index={index}>
			<SlideContent>{children}</SlideContent>
		</SlideItemProvider>
	);
};
