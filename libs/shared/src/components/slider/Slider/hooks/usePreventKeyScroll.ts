import { useEffect } from "react";

const preventKeyScroll = (e: KeyboardEvent | React.KeyboardEvent) => {
	if (
		["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1
	) {
		e.preventDefault();
	}

	const activeEl = document.activeElement as HTMLElement | null;
	const isInteractiveElement = activeEl?.tabIndex === 0;

	if (e.code === "Space" && !isInteractiveElement) {
		e.preventDefault();
		return;
	}
};

const usePreventKeyScroll = () => {
	useEffect(() => {
		window.addEventListener("keydown", preventKeyScroll, false);

		return () => window.removeEventListener("keydown", preventKeyScroll);
	});
};

export { usePreventKeyScroll };
