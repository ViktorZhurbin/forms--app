import { ActionIcon } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import styles from "./NavButtons.module.css";

export const NavButtons = (props: {
	className: string;
	isPrevDisabled: boolean;
	isNextDisabled: boolean;
	onClickPrev: () => void;
	onClickNext: () => void;
}) => {
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

			<ActionIcon size="lg" disabled={isNextDisabled} onClick={onClickNext}>
				<IconChevronDown />
			</ActionIcon>
		</div>
	);
};
