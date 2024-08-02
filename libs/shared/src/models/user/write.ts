import { type User, tx } from "@instantdb/react";
import { db } from "../db";
import type { TUser } from "../user/schema/user";

const createDbUser = async ({ id, email }: Pick<User, "id" | "email">) => {
	const user: Omit<TUser, "id"> = { email };

	await db.transact([tx.users[id].update(user)]);

	return id;
};

export { createDbUser };
