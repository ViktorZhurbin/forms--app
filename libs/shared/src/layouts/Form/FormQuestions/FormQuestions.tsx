import type { TForm } from "~/models/forms/schema/forms";
import {
	FormQuestion,
	type FormQuestionProps,
} from "../FormQuestion/FormQuestion";

type PreviewModalQuestionsProps = Pick<
	FormQuestionProps,
	"setCurrentStep" | "containerRef" | "onSubmit" | "goToNextStep"
> & {
	questions: TForm["questions"];
};

export const FormQuestions = ({
	questions,
	setCurrentStep,
	containerRef,
	onSubmit,
	goToNextStep,
}: PreviewModalQuestionsProps) => {
	return (
		<>
			{questions.map((question, index) => {
				const isLast = index === questions.length - 1;

				return (
					<FormQuestion
						key={question.id}
						index={index}
						isLast={isLast}
						containerRef={containerRef}
						question={question}
						onSubmit={onSubmit}
						goToNextStep={goToNextStep}
						setCurrentStep={setCurrentStep}
					/>
				);
			})}
		</>
	);
};
