import { Button, Progress } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { FetchState } from "~/components/FetchState/FetchState";
import { NavButtons } from "~/components/NavButtons/NavButtons";
import { useCurrentFormQuery } from "~/models/forms/read";
import { PreviewModalQuestions } from "../PreviewModalQuestions/PreviewModalQuestions";
import styles from "./PreviewModalContent.module.css";

type PreviewProps = {
	onClose: () => void;
};

export const PreviewModalContent = ({ onClose }: PreviewProps) => {
	const [step, setStep] = useState(0);
	const { isLoading, error, data } = useCurrentFormQuery();

	const form = data?.forms?.[0];
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const isFirstStep = step === 0;
	const isLastStep = step === (form && form?.questions?.length - 1);

	const scrollToStep = (step: number) => {
		const container = scrollContainerRef.current;

		// container may still be rendering
		// setTimeout to wait for when it's ready to scroll
		setTimeout(() => {
			const target = container?.querySelectorAll("[data-step]")?.[step];

			target?.scrollIntoView({ block: "center", behavior: "smooth" });
		});
	};

	const goToPreviousStep = () => {
		scrollToStep(step - 1);
	};

	const goToNextStep = () => {
		scrollToStep(step + 1);
	};

	const handleSubmit = () => {
		console.log("submit");
	};

	return (
		<div className={styles.container} ref={scrollContainerRef}>
			{form?.questions && (
				<Progress
					size="sm"
					radius={0}
					className={styles.progress}
					value={(100 / form.questions.length) * (step + 1)}
					transitionDuration={500}
				/>
			)}

			<div className={styles.exitButton}>
				<Button
					color="rgb(31, 41, 55)"
					leftSection={<IconX />}
					onClick={onClose}
				>
					Exit preview
				</Button>
			</div>

			{!form ? (
				<FetchState isLoading={isLoading} error={error} />
			) : (
				<PreviewModalQuestions
					form={form}
					setStep={setStep}
					containerRef={scrollContainerRef}
					onSubmit={handleSubmit}
					goToNextStep={goToNextStep}
				/>
			)}

			<NavButtons
				className={styles.navigation}
				isPrevDisabled={isFirstStep}
				isNextDisabled={isLastStep}
				onClickPrev={goToPreviousStep}
				onClickNext={goToNextStep}
			/>
		</div>
	);
};
