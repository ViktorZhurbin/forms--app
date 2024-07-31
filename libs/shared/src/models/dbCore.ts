import { type Query, init } from "@instantdb/core";
import { APP_ID } from "~/constants/app";
import type { Schema } from "./schema";

const dbCore = init<Schema>({
	appId: APP_ID,
});

export const queryOnce = (query: Query) => {
	return new Promise((resolve, reject) => {
		const unsub = dbCore.subscribeQuery(query, (resp) => {
			if (resp.error) {
				reject(resp.error);
			} else if (resp.data) {
				resolve(resp.data);
			}
			unsub();
		});
	});
};
