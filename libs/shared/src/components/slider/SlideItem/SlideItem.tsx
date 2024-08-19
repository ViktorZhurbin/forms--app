import { SliderIds } from "../constants";
import { SlideItemProvider } from "../context/SlideItemContext";
import { useSlider } from "../context/SliderContext";
import styles from "./SlideItem.module.css";
import { getSlidePosition } from "./helpers/getSlidePosition";

export const SlideItem = (
	props: React.PropsWithChildren<{ index: number }>,
) => {
	const { children, index } = props;

	const { activeIndex } = useSlider();
	const position = getSlidePosition(index, activeIndex);

	return (
		<SlideItemProvider index={index} position={position}>
			<div
				id={SliderIds.item}
				className={styles.root}
				data-slide-index={index}
				data-slide-position={position}
			>
				{children}
			</div>
		</SlideItemProvider>
	);
};
