import {
	IconAlignLeft,
	IconBan,
	IconCheckbox,
	IconCircleDot,
} from "@tabler/icons-react";
import { FieldTypes } from "./field";

const FieldTypesMap = {
	[FieldTypes.YesNo]: {
		name: "Yes/No",
		Icon: IconBan,
		type: FieldTypes.YesNo,
	},
	[FieldTypes.Checkboxes]: {
		name: "Checkboxes",
		Icon: IconCheckbox,
		type: FieldTypes.Checkboxes,
	},
	[FieldTypes.MultipleChoice]: {
		name: "Multiple Choice",
		Icon: IconCircleDot,
		type: FieldTypes.MultipleChoice,
	},
	[FieldTypes.ShortText]: {
		name: "Short Text",
		Icon: IconAlignLeft,
		type: FieldTypes.ShortText,
	},
};

const FieldGroupsInfo = {
	Choice: {
		name: "Choice",
		bgColor: "var(--mantine-color-grape-2)",
		types: [FieldTypes.YesNo, FieldTypes.Checkboxes, FieldTypes.MultipleChoice],
	},
	Text: {
		name: "Text",
		bgColor: "var(--mantine-color-blue-2)",
		types: [FieldTypes.ShortText],
	},
};

const getGroupInfoByFieldType = (type: FieldTypes) => {
	switch (type) {
		case FieldTypes.Checkboxes:
		case FieldTypes.MultipleChoice:
		case FieldTypes.YesNo:
			return FieldGroupsInfo.Choice;

		case FieldTypes.ShortText:
			return FieldGroupsInfo.Text;
	}
};

export { FieldTypesMap, FieldGroupsInfo, getGroupInfoByFieldType };
