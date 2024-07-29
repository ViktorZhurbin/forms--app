import {
	IconAlignLeft,
	IconBan,
	IconCheckbox,
	IconCircleDot,
	type TablerIcon,
} from "@tabler/icons-react";
import { FieldGroups, FieldTypes } from "./questions";

type QuestionTypesMapItem = {
	name: string;
	Icon: TablerIcon;
	type: FieldTypes;
	group: FieldGroups;
};
const QuestionTypesMap: Record<FieldTypes, QuestionTypesMapItem> = {
	[FieldTypes.YesNo]: {
		name: "Yes/No",
		Icon: IconBan,
		type: FieldTypes.YesNo,
		group: FieldGroups.Choice,
	},
	[FieldTypes.Checkboxes]: {
		name: "Checkboxes",
		Icon: IconCheckbox,
		type: FieldTypes.Checkboxes,
		group: FieldGroups.Choice,
	},
	[FieldTypes.MultipleChoice]: {
		name: "Multiple Choice",
		Icon: IconCircleDot,
		type: FieldTypes.MultipleChoice,
		group: FieldGroups.Choice,
	},
	[FieldTypes.ShortText]: {
		name: "Short Text",
		Icon: IconAlignLeft,
		type: FieldTypes.ShortText,
		group: FieldGroups.Text,
	},
};

type QuestionGroupsMapItem = {
	name: string;
	group: FieldGroups;
	bgColor: string;
	types: QuestionTypesMapItem[];
};
const QuestionGroupsMap: Record<FieldGroups, QuestionGroupsMapItem> = {
	[FieldGroups.Choice]: {
		name: "Choice",
		group: FieldGroups.Choice,
		bgColor: "var(--mantine-color-grape-2)",
		types: Object.values(QuestionTypesMap).filter(
			(questionType) => questionType.group === FieldGroups.Choice,
		),
	},
	[FieldGroups.Text]: {
		name: "Text",
		group: FieldGroups.Text,
		bgColor: "var(--mantine-color-blue-2)",
		types: Object.values(QuestionTypesMap).filter(
			(questionType) => questionType.group === FieldGroups.Text,
		),
	},
};

export type { QuestionGroupsMapItem, QuestionTypesMapItem };

export { QuestionTypesMap, QuestionGroupsMap };
