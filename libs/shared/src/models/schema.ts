import type { TField } from "./field/schema";
import type { TForm } from "./form/schema/form";
import type { TUser } from "./user/schema/user";
import type { TWorkspace } from "./workspace/schema/workspace";

export type Schema = {
	users: TUser;
	forms: TForm;
	fields: TField;
	workspaces: TWorkspace;
};
