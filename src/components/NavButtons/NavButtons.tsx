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
			<button disabled={isPrevDisabled} onClick={onClickPrev}>
				Previous
			</button>
			<button disabled={isNextDisabled} onClick={onClickNext}>
				Next
			</button>
		</div>
	);
};
