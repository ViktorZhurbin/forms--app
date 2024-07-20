import { AppShell } from "@mantine/core";
import { Main } from "./Main/Main";
import { NavThankYou } from "./Navbar/NavThankYou/NavThankYou";
import { NavbarQuestions } from "./Navbar/NavbarQuestions/NavbarQuestions";

export const BuilderBase = ({ header }: { header: React.ReactElement }) => {
	return (
		<AppShell
			padding="md"
			header={{ height: 60 }}
			navbar={{
				width: 234,
				breakpoint: 0,
				collapsed: { desktop: false, mobile: false },
			}}
		>
			<AppShell.Header>{header}</AppShell.Header>

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
