import type { Db } from "~/models/db";
import { FetchError } from "../FetchError/FetchError";
import { FetchLoading } from "../FetchLoading/FetchLoading";

type FetchStateProps = Pick<
	ReturnType<Db["useQuery"]>,
	"error" | "isLoading"
> & {
	fullScreen?: boolean;
};

export const FetchState = ({
	error,
	isLoading,
	fullScreen,
}: FetchStateProps) => {
	if (isLoading) {
		return <FetchLoading fullScreen={fullScreen} />;
	}

	if (error) {
		return <FetchError message={error.message} />;
	}

	return null;
};
