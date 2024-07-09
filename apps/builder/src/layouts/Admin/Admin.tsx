import { AppShell } from "@mantine/core";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { useAuth } from "./hooks/useAuth";

export const Admin = () => {
	const { isLoading } = useAuth();

	return isLoading ? (
		"LOADING"
	) : (
		<AppShell header={{ height: 60 }} padding="md">
			<AppShell.Header>
				<Header />
			</AppShell.Header>

			<AppShell.Main display="flex">
				<Main />
			</AppShell.Main>
		</AppShell>
	);
};
