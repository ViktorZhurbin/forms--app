import { type InstantReactWeb, init } from "@instantdb/react";
import { APP_ID } from "~/constants/app";
import type { Schema } from "./schema";

type Db = InstantReactWeb<Schema>;

const db: Db = init<Schema>({
	appId: APP_ID,
});

const { useAuth, useQuery } = db;

export { db, type Db, useAuth, useQuery };
