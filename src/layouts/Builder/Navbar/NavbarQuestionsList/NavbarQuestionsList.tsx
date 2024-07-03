import { FetchError } from "~/components/FetchError/FetchError";
import { SkeletonWrapper } from "~/components/SkeletonWrapper/SkeletonWrapper";
import { useFormQuestions } from "~/models/questions/read";
import { useSelectedBlockId } from "../../hooks/useSelectedBlockId";
import { NavbarQuestion } from "../NavbarQuestions/NavbarQuestion/NavbarQuestion";
import styles from "./NavbarQuestionsList.module.css";

export const NavbarQuestionsList = ({ formId }: { formId: string }) => {
	const { isLoading, error, data } = useFormQuestions(formId);

	const firstQuestion = data?.questions?.[0];
	const selectedBlockId = useSelectedBlockId(firstQuestion?.id);

	if (error) {
		return <FetchError message={error.message} />;
	}

	return (
		<div className={styles.questionsList}>
			{data?.questions.map(({ id, type, group, title }, index) => (
				<SkeletonWrapper key={id} visible={isLoading}>
					<NavbarQuestion
						id={id}
						type={type}
						group={group}
						title={title}
						order={index + 1}
						isSelected={Boolean(selectedBlockId) && id === selectedBlockId}
					/>
				</SkeletonWrapper>
			))}
		</div>
	);
};
