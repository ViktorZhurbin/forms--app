import { FetchError } from "~/components/FetchError/FetchError";
import { SkeletonWrapper } from "~/components/SkeletonWrapper/SkeletonWrapper";
import { useOrderedQuestionsQuery } from "~/models/questions/read";
import { useSelectedBlockId } from "../../hooks/useSelectedBlockId";
import { NavbarQuestion } from "../NavbarQuestions/NavbarQuestion/NavbarQuestion";
import styles from "./NavbarQuestionsList.module.css";

export const NavbarQuestionsList = ({ formId }: { formId: string }) => {
	const { isLoading, error, data } = useOrderedQuestionsQuery(formId);

	const firstQuestion = data?.questions?.[0];
	const selectedBlockId = useSelectedBlockId(firstQuestion?.id);

	if (error) {
		return <FetchError message={error.message} />;
	}

	return (
		<div className={styles.questionsList}>
			{data?.questions.map(
				({ id, type, group, title, order }, index, questions) => (
					<SkeletonWrapper key={id} visible={isLoading}>
						<NavbarQuestion
							id={id}
							type={type}
							group={group}
							title={title}
							order={order + 1}
							prevId={index === 0 ? null : questions[index - 1].id}
							isSelected={Boolean(selectedBlockId) && id === selectedBlockId}
						/>
					</SkeletonWrapper>
				),
			)}
		</div>
	);
};
