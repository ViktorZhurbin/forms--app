import {
	AppShell,
	Avatar,
	Box,
	Button,
	Card,
	Group,
	Menu,
	NavLink,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import {
	IconBolt,
	IconPlus,
	IconSearch,
	IconSelector,
	IconSettings,
} from "@tabler/icons-react";
import { useLocation } from "wouter";

export const Admin = () => {
	const [_, setLocation] = useLocation();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
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
				<TextInput
					value=""
					mb={12}
					placeholder="Search"
					leftSection={<IconSearch />}
					onChange={() => null}
				/>
				<AppShell.Section grow>
					<Stack gap={6}>
						<Group gap={6} justify="space-between">
							<Text c="dimmed">Workspaces</Text>
							<IconPlus />
						</Group>
						<Stack gap={6}>
							{[
								"WS 1",
								"Workspace 2",
								"Workspace with a Looooooooooooong Name",
							].map((ws) => (
								<NavLink key={ws} noWrap label={ws} fw={500} />
							))}
						</Stack>
					</Stack>
				</AppShell.Section>
				<Button
					mb={12}
					variant="default"
					leftSection={<IconBolt color="orange" />}
				>
					Upgrade
				</Button>
				<Menu shadow="md" width={200}>
					<Menu.Target>
						<Button
							size="lg"
							variant="default"
							// bg="rgb(243, 244, 246)"
							rightSection={<IconSelector />}
							leftSection={<Avatar />}
						>
							<Box w="100%" ta="left">
								<Text size="sm" fw={500}>
									Kianu Reeves
								</Text>
								<Text truncate="end" size="sm" c="dimmed">
									Kianu Reeves's Workspace
								</Text>
							</Box>
						</Button>
					</Menu.Target>

					<Menu.Dropdown>
						<Menu.Item leftSection={<IconSettings />}>Settings</Menu.Item>
						<Menu.Divider />
						<Menu.Item>What's new</Menu.Item>
						<Menu.Divider />
						<Menu.Item>Log out</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</AppShell.Navbar>

			<AppShell.Main>
				<Stack>
					<Group justify="space-between">
						<div />
						<Button
							leftSection={<IconPlus />}
							onClick={() => {
								setLocation("/forms/id/create");
							}}
						>
							Create form
						</Button>
					</Group>
					<Text tt="uppercase" c="dimmed" size="xs" fw={500}>
						All Forms
					</Text>
					<Stack>
						<Card
							withBorder
							padding="lg"
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
