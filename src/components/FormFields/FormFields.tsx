import { FocusTrap } from "@mantine/core";
import { useParams } from "wouter";
import { db } from "~/models/db";
import { Question } from "../Question/Question";
import styles from "./FormFields.module.css";
import { getPositionDataAttribute } from "./helpers/getPositionDataAttribute";

export const FormFields = (props: {
	step: number;
	onSubmit: () => void;
	goToNextStep: () => void;
}) => {
	const { step, onSubmit, goToNextStep } = props;

	const formId = useParams()?.id ?? "440f17cc-35ba-4ed2-8a0e-46ffa8b0e3d5";

	const { isLoading, error, data } = db.useQuery({
		questions: {
			$: { where: { formId } },
		},
	});

	if (isLoading) {
		return <div>Fetching data...</div>;
	}

	if (error) {
		return <div>Error fetching data: {error.message}</div>;
	}

	return (
		<>
			{data.questions.map((question, index) => {
				const isLast = index === data.questions.length - 1;

				return (
					<FocusTrap key={question.id} active={!isLast && step === index}>
						<FocusTrap.InitialFocus />
						<div
							key={question.id}
							className={styles.root}
							data-position={getPositionDataAttribute(index, step)}
						>
							<Question
								readOnly
								id={question.id}
								isLast={isLast}
								onSubmitForm={onSubmit}
								goToNextStep={goToNextStep}
							/>
						</div>
					</FocusTrap>
				);
			})}
		</>
	);
};
