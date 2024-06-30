import { Skeleton } from "@mantine/core";
import React from "react";
import { FetchError } from "~/components/FetchError/FetchError";
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

	const selectedBlockId = useSelectedBlockId(data?.questions[0]?.id);

	const QuestionWrapper = isLoading ? Skeleton : React.Fragment;

	return (
		<div className={styles.questionsList}>
			{error ? (
				<FetchError message={error.message} />
			) : (
				data?.questions?.map(({ id, group, title }, index) => (
					<QuestionWrapper key={id} visible={isLoading}>
						<NavbarQuestion
							id={id}
							order={index + 1}
							group={group}
							title={title}
							isSelected={
								selectedBlockId ? id === selectedBlockId : index === 0
							}
						/>
					</QuestionWrapper>
				))
			)}
		</div>
	);
};
