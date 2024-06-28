import { Text } from "@mantine/core";
import { useParams } from "wouter";
import { db } from "~/models/db";
import { useSelectedBlockId } from "../../hooks/useSelectedBlockId";
import styles from "./NavQuestions.module.css";
import { NavbarQuestion } from "./NavbarQuestion/NavbarQuestion";

export const NavQuestions = () => {
	const formId = useParams()?.id ?? "440f17cc-35ba-4ed2-8a0e-46ffa8b0e3d5";

	const { isLoading, error, data } = db.useQuery({
		questions: {
			$: { where: { formId } },
		},
	});

	const selectedBlockId = useSelectedBlockId(data?.questions[0]?.id);

	if (isLoading) {
		return <div>Fetching data...</div>;
	}

	if (error) {
		return <div>Error fetching data: {error.message}</div>;
	}

	return (
		<>
			<Text c="dimmed" size="sm" mb={8} p="0 12px">
				Questions
			</Text>
			<div className={styles.questionsList}>
				{data.questions.map(({ id, group, title }, index) => (
					<NavbarQuestion
						key={id}
						id={id}
						order={index + 1}
						group={group}
						title={title}
						isSelected={selectedBlockId ? id === selectedBlockId : index === 0}
					/>
				))}
			</div>
		</>
	);
};
