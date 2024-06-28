import { init } from "@instantdb/react";
import type { FormType } from "./forms/forms";
import type { QuestionType } from "./questions/questions";

// ID for app: Forms
const APP_ID = "c0eca2bb-1fdc-4b6f-99a3-247f7f4aa1a4";

type Schema = {
	forms: FormType;
	questions: QuestionType;
};

const db = init<Schema>({ appId: APP_ID });

export { db };
