import type { TField } from "./field/schema";
import type { TForm } from "./form/schema/form";
import type { TResponse } from "./response/schema";
import type { TUser } from "./user/schema/user";
import type { TWorkspace } from "./workspace/schema/workspace";

export type Schema = {
	users: TUser;
	forms: TForm;
	fields: TField;
	draftFields: TField;
	responses: TResponse;
	workspaces: TWorkspace;
};
