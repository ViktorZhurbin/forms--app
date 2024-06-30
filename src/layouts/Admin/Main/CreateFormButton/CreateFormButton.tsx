import { id, tx } from "@instantdb/react";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { navigate } from "wouter/use-browser-location";
import { Routes } from "~/constants/location";
import { dbTransact } from "~/models/db";

const createDummyForm = async () => {
	const positiveAdjectives = [
		"affectionate",
		"charming",
		"creative",
		"diligent",
		"energetic",
		"helpful",
	];
	const randomIndex = Math.floor(Math.random() * positiveAdjectives.length);

	const formId = id();

	dbTransact(
		tx.forms[formId].update({
			name: `My ${positiveAdjectives[randomIndex]} form`,
			responseCount: 0,
		}),
	);

	return formId;
};

export const CreateFormButton = () => {
	const handleCreateForm = async () => {
		const formId = await createDummyForm();

		const formPath = Routes.getFormPath(formId);
		navigate(formPath);
	};

	return (
		<Button leftSection={<IconPlus />} onClick={handleCreateForm}>
			New form
		</Button>
	);
};
