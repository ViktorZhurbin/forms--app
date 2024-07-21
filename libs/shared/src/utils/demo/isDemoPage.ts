import { Routes } from "~/constants/location";

export const isDemoPage = () =>
	window.location.pathname.includes(Routes.CREATE);
