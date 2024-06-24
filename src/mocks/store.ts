import { createStore } from "tinybase";
import { createLocalPersister } from "tinybase/persisters/persister-browser";
import { useCreatePersister, useCreateStore } from "tinybase/ui-react";
import { FORMS_SCHEMA, mockForms } from "./forms";
import { OPTION_SCHEMA, mockOptions } from "./options";
import { QUESTION_SCHEMA, mockQuestions } from "./questions";

export const useStore = () => {
	const store = useCreateStore(() =>
		createStore().setTablesSchema({
			forms: FORMS_SCHEMA,
			questions: QUESTION_SCHEMA,
			options: OPTION_SCHEMA,
		}),
	);
	// .setTables({
	// 	forms: mockForms,
	// 	questions: mockQuestions,
	// 	options: mockOptions,
	// });

	useCreatePersister(
		store,
		(store) => createLocalPersister(store, "forms"),
		[],
		async (persister) => {
			await persister.startAutoLoad({
				forms: mockForms,
				questions: mockQuestions,
				options: mockOptions,
			});
			await persister.startAutoSave();
		},
	);

	return store;
};
