import { QuestionGroup } from "./questions";

const QuestionColorsByGroup: Record<QuestionGroup, string> = {
	[QuestionGroup.Choice]: "rgb(230, 206, 243)",
	[QuestionGroup.Text]: "rgb(181, 221, 252)",
};

export { QuestionColorsByGroup };
