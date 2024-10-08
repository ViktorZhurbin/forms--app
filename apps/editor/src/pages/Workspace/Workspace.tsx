import { Header } from "./Header/Header";
import { Main } from "./Main/Main";

export const Workspace = () => {
	return (
		<div className="root">
			<header className="header">
				<Header />
			</header>

			<main className="main">
				<Main />
			</main>
		</div>
	);
};
