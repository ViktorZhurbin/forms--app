import { SliderIds } from "../constants";
import { SliderProvider } from "../context/SliderContext";
import styles from "./Slider.module.css";
/**
 * Cover these cases:
 * ✅ wheel
 * ✅ nav buttons
 * ✅ tab & kb
 * ✅ swipe
 */

type Props = React.PropsWithChildren;

export const Slider = (props: Props) => {
	const { children } = props;

	return (
		<SliderProvider>
			<div id={SliderIds.root} className={styles.root}>
				{children}
			</div>
		</SliderProvider>
	);
};
