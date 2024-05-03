import { ReactElement } from "react";
import styles from "./BlockWrapper.module.css";

type BlockWrapperProps = {
	children: ReactElement;
	step: number;
	index: number;
};
export const BlockWrapper = ({ step, index, children }: BlockWrapperProps) => {
	return (
		<section
			className={styles.wrapper}
			style={getBlockWrapperStyles(index, step)}
		>
			{children}
		</section>
	);
};

function getBlockWrapperStyles(index: number, step: number) {
	switch (index) {
		case step:
			return {};

		case step - 1:
			return { opacity: 0, transform: `translateY(-100vh)` };

		case step + 1:
			return { opacity: 0, transform: `translateY(100vh)` };

		default:
			return { display: "none" };
	}
}
