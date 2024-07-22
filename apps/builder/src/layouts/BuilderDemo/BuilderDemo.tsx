import { FetchState } from "@/shared/components/FetchState/FetchState";
import { Routes } from "@/shared/constants/routes";
import { useDbAuth } from "@/shared/models/db";
import { Redirect } from "wouter";
import { HeaderDemo } from "../Builder/Header/HeaderDemo";
import { BuilderBase } from "../Builder/components/BuilderBase";
import { useDemoForm } from "./hooks/useDemoForm";

export const BuilderDemo = () => {
	const auth = useDbAuth();

	const { isLoading, error } = useDemoForm();

	if (auth.user) {
		return <Redirect to={Routes.ROOT} />;
	}

	if (isLoading || error) {
		return <FetchState fullScreen isLoading={isLoading} error={error} />;
	}

	return <BuilderBase header={<HeaderDemo />} />;
};
