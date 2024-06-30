import { FetchError } from "~/components/FetchError/FetchError";
import { SkeletonWrapper } from "~/components/SkeletonWrapper/SkeletonWrapper";
import { db } from "~/models/db";
import { useSelectedBlockId } from "../../hooks/useSelectedBlockId";
import { NavbarQuestion } from "../NavbarQuestions/NavbarQuestion/NavbarQuestion";
import styles from "./NavbarQuestionsList.module.css";

export const NavbarQuestionsList = ({ formId }: { formId: string }) => {
	const { isLoading, error, data } = db.useQuery({
		questions: {
			$: { where: { formId } },
		},
	});

	const selectedBlockId = useSelectedBlockId(data?.questions?.[0].id);

	if (error) {
		return <FetchError message={error.message} />;
	}

	return (
		<div className={styles.questionsList}>
			{data?.questions.map(({ id, group, title }, index) => (
				<SkeletonWrapper key={id} visible={isLoading}>
					<NavbarQuestion
						id={id}
						order={index + 1}
						group={group}
						title={title}
						isSelected={Boolean(selectedBlockId) && id === selectedBlockId}
					/>
				</SkeletonWrapper>
			))}
		</div>
	);
};
