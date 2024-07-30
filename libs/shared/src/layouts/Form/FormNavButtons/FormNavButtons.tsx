import { ActionIcon } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import styles from "./FormNavButtons.module.css";

type FormNavButtonsProps = {
	className: string;
	isPrevDisabled: boolean;
	isNextDisabled: boolean;
	onClickPrev: () => void;
	onClickNext: () => void;
};

export const FormNavButtons = (props: FormNavButtonsProps) => {
	const {
		className,
		isPrevDisabled,
		isNextDisabled,
		onClickPrev,
		onClickNext,
	} = props;

	return (
		<div className={`${className} ${styles.root}`}>
			<ActionIcon
				size="lg"
				aria-label="Previous step"
				disabled={isPrevDisabled}
				onClick={onClickPrev}
				onKeyDown={(event) => {
					// stop tabbing to next element on the last form element
					if (event.key === "Tab" && !event.shiftKey && isNextDisabled) {
						event.preventDefault();
						event.stopPropagation();
					}
				}}
			>
				<IconChevronUp />
			</ActionIcon>

			<ActionIcon
				aria-label="Next step"
				size="lg"
				disabled={isNextDisabled}
				onClick={onClickNext}
			>
				<IconChevronDown />
			</ActionIcon>
		</div>
	);
};
