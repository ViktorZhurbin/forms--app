import { type InstantReactWeb, init } from "@instantdb/react";
import type { TForm } from "./form/schema/form";
import type { TUser } from "./user/schema/user";
import type { TWorkspace } from "./workspace/schema/workspace";

const APP_ID = import.meta.env.PUBLIC_INSTANT_APP_ID;

type Schema = {
	users: TUser;
	forms: TForm;
	workspaces: TWorkspace;
};

type Db = InstantReactWeb<Schema>;

const db: Db = init<Schema>({
	appId: APP_ID,
});

const useDbAuth = db.useAuth;
const useDbQuery: Db["useQuery"] = db.useQuery;
const dbTransact: Db["transact"] = db.transact;

export { db, type Db, useDbQuery, dbTransact, useDbAuth };
