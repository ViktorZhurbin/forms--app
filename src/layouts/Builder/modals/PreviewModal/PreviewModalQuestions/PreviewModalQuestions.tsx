import { FetchState } from "~/components/FetchState/FetchState";
import {
	PreviewQuestion,
	type PreviewQuestionProps,
} from "~/components/PreviewQuestion/PreviewQuestion";
import { useFormId } from "~/layouts/Builder/hooks/useFormId";
import { useFormQuery } from "~/models/forms/read";

type PreviewModalQuestionsProps = Pick<
	PreviewQuestionProps,
	"setStep" | "containerRef" | "onSubmit" | "goToNextStep"
>;

export const PreviewModalQuestions = ({
	setStep,
	containerRef,
	onSubmit,
	goToNextStep,
}: PreviewModalQuestionsProps) => {
	const formId = useFormId();
	const { isLoading, error, data } = useFormQuery(formId);
	const form = data?.forms[0];

	if (!form) {
		return <FetchState isLoading={isLoading} error={error} />;
	}

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
