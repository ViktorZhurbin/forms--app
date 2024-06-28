import { init } from "@instantdb/react";
import type { TForm, TOption, TQuestion } from "./schema";

// ID for app: Forms
const APP_ID = "c0eca2bb-1fdc-4b6f-99a3-247f7f4aa1a4";

// Optional: Declare your schema for intellisense!
type Schema = {
	forms: TForm;
	questions: TQuestion;
	options: TOption;
};

const db = init<Schema>({ appId: APP_ID });

export { db };
