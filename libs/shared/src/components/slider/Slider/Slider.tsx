import { SliderIds } from "../constants";
import { SliderProvider } from "../context/SliderContext";
import styles from "./Slider.module.css";
/**
 * Cover these cases:
 * - wheel
 * - swipe
 * - tab & kb
 * - nav buttons
 */

type Props = React.PropsWithChildren;

const SliderContent = (props: Props) => {
	const { children } = props;

	return (
		<div id={SliderIds.root} className={styles.root}>
			{children}
		</div>
	);
};

export const Slider = (props: Props) => {
	const { children } = props;

	return (
		<SliderProvider>
			<SliderContent>{children}</SliderContent>
		</SliderProvider>
	);
};
