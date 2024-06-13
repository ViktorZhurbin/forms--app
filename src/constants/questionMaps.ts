import { QuestionGroups } from "./questions";

const QuestionColorsByGroup: Record<QuestionGroups, string> = {
	[QuestionGroups.Choice]: "grape.2",
	[QuestionGroups.Text]: "blue.2",
};

export { QuestionColorsByGroup };
