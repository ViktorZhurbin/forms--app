import { init } from "@instantdb/react";
import type { TForm } from "./forms/schema";
import type { TQuestion } from "./questions/schema";

// ID for app: Forms
const APP_ID = "c0eca2bb-1fdc-4b6f-99a3-247f7f4aa1a4";

type Schema = {
	forms: TForm;
	questions: TQuestion;
};

const { useQuery: useDbQuery, transact: dbTransact } = init<Schema>({
	appId: APP_ID,
});

export { useDbQuery, dbTransact };
