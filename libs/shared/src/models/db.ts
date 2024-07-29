import { type InstantReactWeb, init } from "@instantdb/react";
import { APP_ID } from "~/constants/app";
import type { Schema } from "./schema";

type Db = InstantReactWeb<Schema>;

const db: Db = init<Schema>({
	appId: APP_ID,
});

const useDbAuth = db.useAuth;
const useDbQuery: Db["useQuery"] = db.useQuery;
const dbTransact: Db["transact"] = db.transact;

export { db, type Db, useDbQuery, dbTransact, useDbAuth };
