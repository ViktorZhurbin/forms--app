import { init } from "@instantdb/react";
import type { TForm } from "./forms/schema/forms";

// ID for app: Forms 2
const APP_ID = "f6d4525a-81b7-4431-96cb-82f659c07ea5";

type Schema = {
	forms: TForm;
};

const { useQuery: useDbQuery, transact: dbTransact } = init<Schema>({
	appId: APP_ID,
});

export { useDbQuery, dbTransact };
