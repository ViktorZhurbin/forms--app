import {
	IconAlignLeft,
	IconBan,
	IconList,
	IconListCheck,
	type TablerIcon,
} from "@tabler/icons-react";
import { QuestionGroups, QuestionTypes } from "./questions";

type QuestionTypesMapItem = {
	name: string;
	Icon: TablerIcon;
	type: QuestionTypes;
	group: QuestionGroups;
};
const QuestionTypesMap: Record<QuestionTypes, QuestionTypesMapItem> = {
	[QuestionTypes.YesNo]: {
		name: "Yes/No",
		Icon: IconBan,
		type: QuestionTypes.YesNo,
		group: QuestionGroups.Choice,
	},
	[QuestionTypes.MultipleChoice]: {
		name: "Multiple Choice (choose many)",
		Icon: IconListCheck,
		type: QuestionTypes.MultipleChoice,
		group: QuestionGroups.Choice,
	},
	[QuestionTypes.MultipleChoiceSingle]: {
		name: "Multiple Choice (choose one)",
		Icon: IconList,
		type: QuestionTypes.MultipleChoiceSingle,
		group: QuestionGroups.Choice,
	},
	[QuestionTypes.ShortText]: {
		name: "Short Text",
		Icon: IconAlignLeft,
		type: QuestionTypes.ShortText,
		group: QuestionGroups.Text,
	},
};

type QuestionGroupsMapItem = {
	name: string;
	group: QuestionGroups;
	bgColor: string;
	types: QuestionTypesMapItem[];
};
const QuestionGroupsMap: Record<QuestionGroups, QuestionGroupsMapItem> = {
	[QuestionGroups.Choice]: {
		name: "Choice",
		group: QuestionGroups.Choice,
		bgColor: "var(--mantine-color-grape-2)",
		types: Object.values(QuestionTypesMap).filter(
			(questionType) => questionType.group === QuestionGroups.Choice,
		),
	},
	[QuestionGroups.Text]: {
		name: "Text",
		group: QuestionGroups.Text,
		bgColor: "var(--mantine-color-blue-2)",
		types: Object.values(QuestionTypesMap).filter(
			(questionType) => questionType.group === QuestionGroups.Text,
		),
	},
};

export type { QuestionGroupsMapItem, QuestionTypesMapItem };

export { QuestionTypesMap, QuestionGroupsMap };
