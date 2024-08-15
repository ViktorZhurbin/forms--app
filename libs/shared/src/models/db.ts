import { type InstantReactWeb, init } from "@instantdb/react";
import { APP_ID } from "~/constants/app";
import type { Schema } from "./schema";

type Db = InstantReactWeb<Schema>;
type UseQuery = ReturnType<Db["useQuery"]>;
type UseQueryError = UseQuery["error"];

const db: Db = init<Schema>({
	appId: APP_ID,
});

const { useAuth, useQuery } = db;

export type { Db, UseQuery, UseQueryError };

export { db, useAuth, useQuery };
