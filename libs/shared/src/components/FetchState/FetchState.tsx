import type { Db } from "~/models/db";
import { FetchError } from "../FetchError/FetchError";
import { FetchLoading } from "../FetchLoading/FetchLoading";

type FetchStateProps = Pick<ReturnType<Db["useQuery"]>, "error" | "isLoading">;

export const FetchState = ({ error, isLoading }: FetchStateProps) => {
	if (isLoading) {
		return <FetchLoading />;
	}

	if (error) {
		return <FetchError message={error.message} />;
	}

	return null;
};
