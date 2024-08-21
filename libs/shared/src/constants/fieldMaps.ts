import {
	IconAlignLeft,
	IconBalloon,
	IconBan,
	IconCheckbox,
	IconCircleDot,
	IconHeartHandshake,
	IconQuote,
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
	[FieldTypes.Welcome]: {
		name: "Welcome",
		Icon: IconBalloon,
		type: FieldTypes.Welcome,
	},
	[FieldTypes.Statement]: {
		name: "Statement",
		Icon: IconQuote,
		type: FieldTypes.Statement,
	},
	[FieldTypes.Ending]: {
		name: "Ending",
		Icon: IconHeartHandshake,
		type: FieldTypes.Ending,
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
	Other: {
		name: "Other",
		bgColor: "var(--mantine-color-gray-2)",
		types: [FieldTypes.Statement],
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

		case FieldTypes.Welcome:
		case FieldTypes.Statement:
		case FieldTypes.Ending:
			return FieldGroupsInfo.Other;
	}
};

export { FieldTypesMap, FieldGroupsInfo, getGroupInfoByFieldType };
