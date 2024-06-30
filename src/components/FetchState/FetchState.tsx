import type { db } from "~/models/db";
import { FetchError } from "../FetchError/FetchError";
import { FetchLoading } from "../FetchLoading/FetchLoading";

type FetchStateProps = Pick<
	ReturnType<typeof db.useQuery>,
	"error" | "isLoading"
>;

export const FetchState = ({ error, isLoading }: FetchStateProps) => {
	if (isLoading) {
		return <FetchLoading />;
	}

	if (error) {
		return <FetchError message={error.message} />;
	}

	return null;
};
