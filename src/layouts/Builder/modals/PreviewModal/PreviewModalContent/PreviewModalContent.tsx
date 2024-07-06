import { Button } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { FetchState } from "~/components/FetchState/FetchState";
import { NavButtons } from "~/components/NavButtons/NavButtons";
import { PreviewQuestion } from "~/components/PreviewQuestion/PreviewQuestion";
import { useFormQuery } from "~/models/forms/read";
import { useFormId } from "../../../hooks/useFormId";
import styles from "./PreviewModalContent.module.css";

type PreviewProps = {
	onClose: () => void;
};

export const PreviewModalContent = ({ onClose }: PreviewProps) => {
	const formId = useFormId();
	const [step, setStep] = useState(0);

	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const { isLoading, error, data } = useFormQuery(formId);
	const form = data?.forms[0];

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
			<div className={styles.exitButton}>
				<Button
					color="rgb(31, 41, 55)"
					leftSection={<IconX />}
					onClick={onClose}
				>
					Exit preview
				</Button>
			</div>

			{form ? (
				form.questions.map((question, index) => {
					const isLast = index === form.questions.length - 1;

					return (
						<PreviewQuestion
							key={question.id}
							index={index}
							isLast={isLast}
							setStep={setStep}
							containerRef={scrollContainerRef}
							question={question}
							onSubmit={handleSubmit}
							goToNextStep={goToNextStep}
						/>
					);
				})
			) : (
				<FetchState isLoading={isLoading} error={error} />
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
