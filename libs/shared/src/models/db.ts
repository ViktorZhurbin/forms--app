import { type InstantReactWeb, init } from "@instantdb/react";
import type { TForm } from "./forms/schema/forms";

const APP_ID = import.meta.env.PUBLIC_INSTANT_APP_ID;

type Schema = {
	forms: TForm;
};

type Db = InstantReactWeb<Schema>;

const db: Db = init<Schema>({
	appId: APP_ID,
});

const useDbAuth = db.useAuth;
const useDbQuery: Db["useQuery"] = db.useQuery;
const dbTransact: Db["transact"] = db.transact;

export { db, useDbQuery, dbTransact, useDbAuth };
