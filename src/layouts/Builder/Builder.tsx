import { AppShell, ScrollArea } from "@mantine/core";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { NavQuestions } from "./Navbar/NavQuestions/NavQuestions";
import { NavThankYou } from "./Navbar/NavThankYou/NavThankYou";

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
				<AppShell.Section grow component={ScrollArea} scrollbars="y">
					<NavQuestions />
				</AppShell.Section>

				<AppShell.Section grow component={ScrollArea}>
					<NavThankYou />
				</AppShell.Section>
			</AppShell.Navbar>

			<AppShell.Main display="flex">
				<Main />
			</AppShell.Main>
		</AppShell>
	);
};
