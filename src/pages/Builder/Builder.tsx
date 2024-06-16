import { AppShell, ScrollArea } from "@mantine/core";
import { Aside } from "./Aside/Aside";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { NavQuestions } from "./Navbar/NavQuestions/NavQuestions";
import { NavThankYou } from "./Navbar/NavThankYou/NavThankYou";

const sharedProps = {
	breakpoint: "xs",
	collapsed: { desktop: false, mobile: false },
};

export const Builder = () => {
	return (
		<AppShell
			padding="md"
			header={{ height: 60 }}
			navbar={{ width: 200, ...sharedProps }}
			aside={{ width: 200, ...sharedProps }}
		>
			<AppShell.Header>
				<Header />
			</AppShell.Header>

			<AppShell.Navbar p="md">
				<AppShell.Section grow component={ScrollArea}>
					<NavQuestions />
				</AppShell.Section>

				<AppShell.Section grow component={ScrollArea}>
					<NavThankYou />
				</AppShell.Section>
			</AppShell.Navbar>

			<AppShell.Main display="flex">
				<Main />
			</AppShell.Main>

			<AppShell.Aside p="md">
				<Aside />
			</AppShell.Aside>
		</AppShell>
	);
};