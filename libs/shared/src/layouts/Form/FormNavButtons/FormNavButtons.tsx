import { ActionIcon, Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
	IconChevronDown,
	IconChevronLeft,
	IconChevronUp,
} from "@tabler/icons-react";
import clsx from "clsx";
import { useSwiper } from "swiper/react";
import { useSwiperDetails } from "~/components/fields/hooks/useSwiperDetails";
import { Media } from "~/constants/mediaQueries";
import styles from "./FormNavButtons.module.css";

export const FormNavButtons = (props: {
	buttonText: string;
	className?: string;
	onGoNext: () => void;
	onSubmit: () => void;
}) => {
	const swiper = useSwiper();
	const { isBeginning, isEnd } = useSwiperDetails();

	const isSmallScreen = useMediaQuery(Media.FormViewSmall);

	const handleGoBack = () => {
		swiper.slidePrev();
	};

	if (isSmallScreen) {
		return (
			<div className={clsx(styles.rootSmall, props.className)}>
				{isBeginning ? null : (
					<ActionIcon
						className={styles.previous}
						disabled={isBeginning}
						onClick={handleGoBack}
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
				onClick={handleGoBack}
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
