import { ActionIcon } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import clsx from "clsx";
import { useSwiper } from "swiper/react";
import { useSwiperDetails } from "~/components/fields/hooks/useSwiperDetails";
import styles from "./FormNavButtons.module.css";

export const FormNavButtons = (props: { className?: string }) => {
	const swiper = useSwiper();

	const { isBeginning, isEnd } = useSwiperDetails();

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

			<ActionIcon
				aria-label="Next step"
				size="lg"
				disabled={isEnd}
				onClick={() => {
					swiper.slideNext();
				}}
			>
				<IconChevronDown />
			</ActionIcon>
		</div>
	);
};
