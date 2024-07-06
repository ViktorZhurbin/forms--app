import { FetchError } from "~/components/FetchError/FetchError";
import { SkeletonWrapper } from "~/components/SkeletonWrapper/SkeletonWrapper";
import { useCurrentFormQuery } from "~/models/forms/read";
import { useDeleteQuestion } from "~/models/forms/write/hooks/useDeleteQuestion";
import { useSelectedBlockId } from "../../hooks/useSelectedBlockId";
import { navigateToQuestion } from "../../utils/navigateToQuestion";
import { NavbarQuestion } from "../NavbarQuestions/NavbarQuestion/NavbarQuestion";
import styles from "./NavbarQuestionsList.module.css";

export const NavbarQuestionsList = () => {
	const { isLoading, error, data: form } = useCurrentFormQuery();

	const firstQuestion = form?.questions?.[0];
	const selectedBlockId = useSelectedBlockId(firstQuestion?.id);

	const { deleteQuestion } = useDeleteQuestion();

	if (error) {
		return <FetchError message={error.message} />;
	}

	return (
		<div className={styles.questionsList}>
			{form?.questions.map(({ id, type, group, title }, index, questions) => {
				const prevId = index === 0 ? null : questions[index - 1].id;

				const handleDelete = async () => {
					await deleteQuestion(id);

					if (prevId) {
						navigateToQuestion(prevId);
					}
				};

				return (
					<SkeletonWrapper key={id} visible={isLoading}>
						<NavbarQuestion
							id={id}
							type={type}
							group={group}
							title={title}
							order={index + 1}
							onDelete={handleDelete}
							isSelected={Boolean(selectedBlockId) && id === selectedBlockId}
						/>
					</SkeletonWrapper>
				);
			})}
		</div>
	);
};
