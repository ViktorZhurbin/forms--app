import type { TForm } from "@/shared/models/forms/schema/forms";
import {
	PreviewQuestion,
	type PreviewQuestionProps,
} from "@forms/shared/src/components/PreviewQuestion/PreviewQuestion";

type PreviewModalQuestionsProps = Pick<
	PreviewQuestionProps,
	"setStep" | "containerRef" | "onSubmit" | "goToNextStep"
> & {
	form: TForm;
};

export const PreviewModalQuestions = ({
	form,
	setStep,
	containerRef,
	onSubmit,
	goToNextStep,
}: PreviewModalQuestionsProps) => {
	return (
		<>
			{form.questions.map((question, index) => {
				const isLast = index === form.questions.length - 1;

				return (
					<PreviewQuestion
						key={question.id}
						index={index}
						isLast={isLast}
						setStep={setStep}
						containerRef={containerRef}
						question={question}
						onSubmit={onSubmit}
						goToNextStep={goToNextStep}
					/>
				);
			})}
		</>
	);
};
