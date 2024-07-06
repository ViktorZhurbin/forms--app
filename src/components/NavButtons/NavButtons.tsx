import { Button } from "@mantine/core";
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
			<Button
				variant="subtle"
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
				Previous
			</Button>
			<Button variant="subtle" disabled={isNextDisabled} onClick={onClickNext}>
				Next
			</Button>
		</div>
	);
};
