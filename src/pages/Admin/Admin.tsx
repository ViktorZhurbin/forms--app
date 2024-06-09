import { AppShell, Burger, Card, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "wouter";

export const Admin = () => {
	const [opened, { toggle }] = useDisclosure();

	return (
		// https://mantine.dev/app-shell/?e=AltLayout
		// https://github.com/mantinedev/mantine/tree/master/apps/mantine.dev/src/app-shell-examples/examples
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
			padding="md"
		>
			<AppShell.Header>
				<Group h="100%" px="md">
					<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
					<div>Logo</div>
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p="md">Navbar</AppShell.Navbar>

			<AppShell.Main>
				<Title size="h2">Forms</Title>
				<Link href="/forms/1/create">
					<Card>Dummy form</Card>
				</Link>
			</AppShell.Main>
		</AppShell>
	);
};
