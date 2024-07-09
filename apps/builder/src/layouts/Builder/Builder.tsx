import { useCurrentFormQuery } from "@/shared/models/forms/read";
import { AppShell } from "@mantine/core";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { NavThankYou } from "./Navbar/NavThankYou/NavThankYou";
import { NavbarQuestions } from "./Navbar/NavbarQuestions/NavbarQuestions";
import { NotFound } from "./NotFound/NotFound";

export const Builder = () => {
	const { data } = useCurrentFormQuery();

	const formNotFound = data?.forms.length === 0;

	if (formNotFound) {
		return <NotFound />;
	}

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
