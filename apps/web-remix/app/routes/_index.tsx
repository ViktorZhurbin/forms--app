import type { MetaFunction } from "@remix-run/node";
import { Header } from "~/components/Header/Header";
import { Main } from "~/components/Main/Main";

export const meta: MetaFunction = () => {
	return [{ title: "Forms | Home" }];
};

export default function Index() {
	return (
		<div>
			<Header />
			<Main />
		</div>
	);
}
