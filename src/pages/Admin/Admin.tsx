import { AppShell } from "@mantine/core";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";

export const Admin = () => {
	return (
		<AppShell header={{ height: 60 }} padding="md">
			<AppShell.Header>
				<Header />
			</AppShell.Header>

			<AppShell.Main>
				<Main />
			</AppShell.Main>
		</AppShell>
	);
};
