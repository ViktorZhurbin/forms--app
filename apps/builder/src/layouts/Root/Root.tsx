import { Routes } from "@/shared/constants/routes";
import { useDbAuth } from "@/shared/models/db";
import { Redirect } from "wouter";
import { FullScreenLoader } from "~/components/FullScreenLoader/FullScreenLoader";
import { RedirectToWorkspace } from "./RedirectToWorkspace";

export const Root = () => {
	const auth = useDbAuth();

	if (auth.isLoading) {
		return <FullScreenLoader />;
	}

	if (auth.user) {
		return <RedirectToWorkspace authUser={auth.user} />;
	}

	return <Redirect to={Routes.SIGN_IN} />;
};
