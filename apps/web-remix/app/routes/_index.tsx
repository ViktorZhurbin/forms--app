import type { MetaFunction } from "@remix-run/node";
import { Header } from "~/components/Header/Header";

export const meta: MetaFunction = () => {
	return [{ title: "Forms | Home" }];
};

export default function Index() {
	return (
		<div>
			<Header />
		</div>
	);
}
