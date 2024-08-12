import { FieldTypes } from "@/shared/constants/field";
import type {
	TField,
	TFieldChoice,
	TFieldText,
} from "@/shared/models/field/schema";
import {
	type UpdateSettingPayload,
	updateFieldSetting,
} from "@/shared/models/field/write";
import { useSelectedField } from "~/pages/form/hooks/useSelectedField";
import { SettingsSwitch } from "../components/SettingsSwitch/SettingsSwitch";

export const FieldSettings = () => {
	const field = useSelectedField();

	if (!field) return null;

	const handleChangeSetting = <T extends TField>(
		payload: UpdateSettingPayload<T>,
	) => {
		// if (!field) return;

		updateFieldSetting({
			id: field.id,
			payload,
		});
	};

	switch (field.type) {
		case FieldTypes.YesNo:
		case FieldTypes.Checkboxes:
		case FieldTypes.MultipleChoice: {
			return (
				<RequiredSwitch
					checked={field.settings?.isRequired}
					onChange={handleChangeSetting}
				/>
			);
		}

		case FieldTypes.ShortText: {
			return (
				<RequiredSwitch
					checked={field.settings?.isRequired}
					onChange={handleChangeSetting}
				/>
			);
		}

		case FieldTypes.Welcome:
			return null;

		case FieldTypes.Ending:
			return null;

		default:
			return null;
	}
};

function RequiredSwitch(props: {
	checked: boolean;
	onChange: (payload: UpdateSettingPayload<TFieldChoice | TFieldText>) => void;
}) {
	return (
		<SettingsSwitch
			label="Required"
			checked={props.checked}
			onChange={(e) => {
				props.onChange({
					key: "isRequired",
					value: e.currentTarget.checked,
				});
			}}
		/>
	);
}
