import { FieldTypes } from "@/shared/constants/field";
import type { TFieldChoice, TFieldText } from "@/shared/models/field/schema";
import { updateFieldSetting } from "@/shared/models/field/write";
import { useSelectedField } from "~/pages/form/hooks/useSelectedField";
import { SettingsSwitch } from "../components/SettingsSwitch/SettingsSwitch";

export const FieldSettings = () => {
	const field = useSelectedField();

	if (!field) return null;

	switch (field.type) {
		case FieldTypes.YesNo:
		case FieldTypes.Checkboxes:
		case FieldTypes.MultipleChoice: {
			return <RequiredSwitch field={field} />;
		}

		case FieldTypes.ShortText: {
			return <RequiredSwitch field={field} />;
		}

		case FieldTypes.Welcome:
		case FieldTypes.Statement:
			return null;

		case FieldTypes.Ending:
			return null;

		default:
			return null;
	}
};

function RequiredSwitch(props: {
	field: TFieldChoice | TFieldText;
}) {
	const { field } = props;

	return (
		<SettingsSwitch
			label="Required"
			checked={!!field.settings?.isRequired}
			onChange={(e) => {
				updateFieldSetting({
					field,
					payload: {
						isRequired: e.currentTarget.checked,
					},
				});
			}}
		/>
	);
}
