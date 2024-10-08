import { useAuth } from "@/shared/models/db";
import { Redirect } from "wouter";
import { FullScreenLoader } from "~/components/FullScreenLoader/FullScreenLoader";
import { Routes } from "~/constants/routes";
import { RedirectToWorkspace } from "./RedirectToWorkspace";

export const Root = () => {
	const auth = useAuth();

	if (auth.isLoading) {
		return <FullScreenLoader />;
	}

	if (auth.user) {
		return <RedirectToWorkspace authUser={auth.user} />;
	}

	return <Redirect to={Routes.SIGN_IN} />;
};
