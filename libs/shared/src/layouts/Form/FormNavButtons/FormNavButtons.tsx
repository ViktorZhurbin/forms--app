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
	onGoNext: () => void;
	onGoBack: () => void;
	onSubmit: () => void;
}) => {
	const { isBeginning, isEnd } = useSlider();

	const isSmallScreen = useMediaQuery(Media.FormViewSmall);

	if (isSmallScreen) {
		return (
			<div className={clsx(styles.rootSmall, props.className)}>
				{isBeginning ? null : (
					<ActionIcon
						className={styles.previous}
						disabled={isBeginning}
						onClick={props.onGoBack}
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
				onClick={props.onGoBack}
			>
				<IconChevronUp />
			</ActionIcon>

			<ActionIcon
				aria-label="Next step"
				size="lg"
				disabled={isEnd}
				onClick={props.onGoNext}
			>
				<IconChevronDown />
			</ActionIcon>
		</div>
	);
};
