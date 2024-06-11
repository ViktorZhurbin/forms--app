import { AppShell, Card, Group, ScrollArea, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useLocation } from "wouter";

export const Admin = () => {
	const [_, setLocation] = useLocation();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 200,
				breakpoint: "xs",
				collapsed: { desktop: false, mobile: false },
			}}
			padding="md"
		>
			<AppShell.Header>
				<Group h="100%" px="md">
					<div>Logo</div>
				</Group>
			</AppShell.Header>

			<AppShell.Navbar p="md">
				<AppShell.Section grow component={ScrollArea}>
					<Stack gap={6}>
						<Group gap={6} justify="space-between">
							<Text c="dimmed">Workspaces</Text>
							<IconPlus width="1rem" />
						</Group>
						<Stack gap={6}>
							<Card
								withBorder
								padding={8}
								radius="md"
								style={{ cursor: "pointer" }}
							>
								<Text size="sm" fw={500}>
									ws 1
								</Text>
							</Card>
							<Card
								withBorder
								padding={8}
								radius="md"
								style={{ cursor: "pointer" }}
							>
								<Text size="sm" fw={500}>
									workspace 2
								</Text>
							</Card>
						</Stack>
					</Stack>
				</AppShell.Section>
			</AppShell.Navbar>

			<AppShell.Main>
				<Stack>
					<Text tt="uppercase" c="dimmed" size="xs" fw={500}>
						All Forms
					</Text>
					<Stack>
						<Card
							withBorder
							padding="lg"
							radius="md"
							style={{ cursor: "pointer" }}
							onClick={() => {
								setLocation("/forms/1/create");
							}}
						>
							Dummy form
						</Card>
					</Stack>
				</Stack>
			</AppShell.Main>
		</AppShell>
	);
};
