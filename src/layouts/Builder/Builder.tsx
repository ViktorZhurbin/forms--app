import { AppShell } from "@mantine/core";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { NavThankYou } from "./Navbar/NavThankYou/NavThankYou";
import { NavbarQuestions } from "./Navbar/NavbarQuestions/NavbarQuestions";

export const Builder = () => {
	return (
		<AppShell
			padding="md"
			header={{ height: 60 }}
			navbar={{
				width: 200,
				breakpoint: 0,
				collapsed: { desktop: false, mobile: false },
			}}
		>
			<AppShell.Header>
				<Header />
			</AppShell.Header>

			<AppShell.Navbar p="sm">
				<AppShell.Section grow>
					<NavbarQuestions />
				</AppShell.Section>

				<AppShell.Section grow>
					<NavThankYou />
				</AppShell.Section>
			</AppShell.Navbar>

			<AppShell.Main display="flex">
				<Main />
			</AppShell.Main>
		</AppShell>
	);
};
