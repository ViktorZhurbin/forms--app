import {
	PreviewQuestion,
	type PreviewQuestionProps,
} from "~/components/PreviewQuestion/PreviewQuestion";
import type { TForm } from "~/models/forms/schema/forms";

type PreviewModalQuestionsProps = Pick<
	PreviewQuestionProps,
	"setStep" | "containerRef" | "onSubmit" | "goToNextStep"
> & {
	questions: TForm["questions"];
};

export const FormQuestions = ({
	questions,
	setStep,
	containerRef,
	onSubmit,
	goToNextStep,
}: PreviewModalQuestionsProps) => {
	return (
		<>
			{questions.map((question, index) => {
				const isLast = index === questions.length - 1;

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
