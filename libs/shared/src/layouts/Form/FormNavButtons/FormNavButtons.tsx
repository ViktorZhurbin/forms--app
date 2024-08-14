import { ActionIcon, Tooltip } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import clsx from "clsx";
import { useSwiper } from "swiper/react";
import { useSwiperDetails } from "~/components/fields/hooks/useSwiperDetails";
import styles from "./FormNavButtons.module.css";

export const FormNavButtons = (props: {
	className?: string;
	onGoNext: () => void;
}) => {
	const swiper = useSwiper();

	const { isBeginning, isEnd, allowSlideNext } = useSwiperDetails();

	return (
		<div className={clsx(styles.root, props.className)}>
			<ActionIcon
				size="lg"
				aria-label="Previous step"
				disabled={isBeginning}
				onClick={() => {
					swiper.slidePrev();
				}}
			>
				<IconChevronUp />
			</ActionIcon>

			<Tooltip
				withArrow
				disabled={allowSlideNext && !isEnd}
				label="This step is required"
			>
				<ActionIcon
					aria-label="Next step"
					size="lg"
					disabled={isEnd || !allowSlideNext}
					onClick={props.onGoNext}
				>
					<IconChevronDown />
				</ActionIcon>
			</Tooltip>
		</div>
	);
};
