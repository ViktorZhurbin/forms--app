import type { MetaFunction } from "@remix-run/node";
import { Home } from "~/pages/Home/Home";

export const meta: MetaFunction = () => {
	return [{ title: "Forms | Home" }];
};

export default function Index() {
	return <Home />;
}
