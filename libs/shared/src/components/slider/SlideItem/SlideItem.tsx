import { VisuallyHidden } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { SliderIds } from "../constants";
import { SlideItemProvider } from "../context/SlideItemContext";
import { useSlider } from "../context/SliderContext";
import styles from "./SlideItem.module.css";
import { getSlidePosition } from "./helpers/getSlidePosition";

export const SlideItem = (
	props: React.PropsWithChildren<{ index: number }>,
) => {
	const { children, index } = props;
	const [position, setPosition] =
		useState<ReturnType<typeof getSlidePosition>>();

	const { activeIndex, slideTo } = useSlider();
	useEffect(() => {
		setPosition(getSlidePosition(index, activeIndex));
	}, [index, activeIndex]);

	const initialFocusRef = useRef<HTMLDivElement>(null);
	const slideItemRootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const rootEl = slideItemRootRef.current;

		if (position !== "active" || rootEl?.contains(document.activeElement)) {
			return;
		}

		setTimeout(() => {
			initialFocusRef.current?.focus();
			initialFocusRef.current?.blur();
		}, 100);
	}, [position]);

	return (
		<SlideItemProvider index={index} position={position}>
			<div>
				<VisuallyHidden ref={initialFocusRef} tabIndex={-1} />
				<div
					id={SliderIds.item}
					ref={slideItemRootRef}
					className={styles.root}
					data-slide-index={index}
					data-slide-position={position}
					onFocus={() => {
						slideTo(index);
					}}
				>
					{children}
				</div>
			</div>
		</SlideItemProvider>
	);
};
