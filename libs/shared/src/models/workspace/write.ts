import { type User, id, tx } from "@instantdb/react";
import { makeId } from "~/utils/makeId";
import { db } from "../db";
import type { TWorkspace } from "./schema/workspace";

const createWorkspace = async ({
	name,
	userId,
}: { name: string; userId: User["id"] }) => {
	const workspace: Omit<TWorkspace, "id"> = {
		name,
		nanoId: makeId(),
	};

	const workspaceId: string = id();

	await db.transact([
		tx.workspaces[workspaceId].update(workspace).link({ users: userId }),
	]);

	return workspaceId;
};

export { createWorkspace };
