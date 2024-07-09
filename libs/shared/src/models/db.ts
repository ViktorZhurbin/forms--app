import { type InstantReactWeb, init } from "@instantdb/react";
import type { TForm } from "./forms/schema/forms";

// ID for app: Forms 2
const APP_ID = "f6d4525a-81b7-4431-96cb-82f659c07ea5";

type Schema = {
	forms: TForm;
};

type Db = InstantReactWeb<Schema>;

const db: Db = init<Schema>({
	appId: APP_ID,
});

const useDbQuery: Db["useQuery"] = db.useQuery;
const dbTransact: Db["transact"] = db.transact;
const useDbAuth = db.useAuth;

export { db, useDbQuery, dbTransact, useDbAuth };
