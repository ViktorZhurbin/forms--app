import type { TWorkspace } from "~/models/workspace/schema/workspace";
import type { TQuestion } from "./questions";

type TForm = {
	id: string;
	nanoid: string;
	name: string;
	workspaceId: TWorkspace["id"];
	responseCount: number;
	questions: TQuestion[];
	draftQuestions: TQuestion[];
};

export type { TForm };
