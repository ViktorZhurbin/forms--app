import { AppShell } from "@mantine/core";
import { ThemeProvider } from "~/contexts/ThemeProvider/ThemeProvider";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";

export const Admin = () => {
	return (
		<ThemeProvider>
			<AppShell header={{ height: 60 }} padding="md">
				<AppShell.Header>
					<Header />
				</AppShell.Header>

				<AppShell.Main>
					<Main />
				</AppShell.Main>
			</AppShell>
		</ThemeProvider>
	);
};
