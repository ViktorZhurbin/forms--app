import { QuestionGroups } from "./questions";

const QuestionColorsByGroup: Record<QuestionGroups, string> = {
	[QuestionGroups.Choice]: "var(--mantine-color-grape-2)",
	[QuestionGroups.Text]: "var(--mantine-color-blue-2)",
};

export { QuestionColorsByGroup };
