import { ActionIcon, Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
	IconChevronDown,
	IconChevronLeft,
	IconChevronUp,
} from "@tabler/icons-react";
import clsx from "clsx";
import { useSlider } from "~/components/slider/context/SliderContext";
import { Media } from "~/constants/mediaQueries";
import styles from "./FormNavButtons.module.css";

export const FormNavButtons = (props: {
	buttonText: string;
	className?: string;
	onSubmit: () => void;
}) => {
	const { isBeginning, isEnd, slidePrev } = useSlider();

	const isSmallScreen = useMediaQuery(Media.FormViewSmall);

	if (isSmallScreen) {
		return (
			<div className={clsx(styles.rootSmall, props.className)}>
				{isBeginning || isEnd ? null : (
					<ActionIcon
						className={styles.previous}
						disabled={isBeginning}
						onClick={slidePrev}
					>
						<IconChevronLeft />
					</ActionIcon>
				)}

				<Button fullWidth className={styles.next} onClick={props.onSubmit}>
					{props.buttonText}
				</Button>
			</div>
		);
	}

	return (
		<div className={clsx(styles.root, props.className)}>
			<ActionIcon
				size="lg"
				aria-label="Previous step"
				disabled={isBeginning}
				onClick={slidePrev}
			>
				<IconChevronUp />
			</ActionIcon>

			<ActionIcon
				aria-label="Next step"
				size="lg"
				disabled={isEnd}
				onClick={props.onSubmit}
			>
				<IconChevronDown />
			</ActionIcon>
		</div>
	);
};
