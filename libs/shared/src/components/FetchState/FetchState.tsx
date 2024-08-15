import type { UseQuery } from "~/models/db";
import { FetchError } from "../FetchError/FetchError";
import { FetchLoading } from "../FetchLoading/FetchLoading";

type FetchStateProps = {
	error: UseQuery["error"];
	isLoading: UseQuery["isLoading"];
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
