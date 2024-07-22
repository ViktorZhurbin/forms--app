import { Routes } from "~/constants/routes";

export const isDemoPage = () =>
	window.location.pathname.includes(Routes.CREATE);
