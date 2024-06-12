import {
	ActionIcon,
	AppShell,
	Button,
	Group,
	ScrollArea,
	Tabs,
	Text,
	TextInput,
	Tooltip,
} from "@mantine/core";
import { IconBan, IconEye, IconHome } from "@tabler/icons-react";
import { useLocation } from "wouter";

export const Builder = () => {
	const [_, setLocation] = useLocation();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 200,
				breakpoint: "xs",
				collapsed: { desktop: false, mobile: false },
			}}
			aside={{
				width: 200,
				breakpoint: "xs",
				collapsed: { desktop: false, mobile: false },
			}}
			padding="md"
		>
			<AppShell.Header>
				<Group h="100%" px="md" justify="space-between">
					<Group>
						<Tooltip withArrow label="Home">
							<ActionIcon
								variant="default"
								size="lg"
								onClick={() => {
									setLocation("/");
								}}
							>
								<IconHome />
							</ActionIcon>
						</Tooltip>
						<TextInput pointer defaultValue="My form" size="sm" />
					</Group>
					<Group>
						<Button
							variant="default"
							color="#6b7280"
							leftSection={
								<IconEye style={{ width: "1.2rem", height: "1.2rem" }} />
							}
							onClick={() => {
								setLocation("/forms/1/preview");
							}}
						>
							Preview
						</Button>
						<Tooltip
							withArrow
							arrowSize={6}
							label="Make your changes visible to the world"
						>
							<Button color="rgb(31, 41, 55)">Publish</Button>
						</Tooltip>
					</Group>
				</Group>
			</AppShell.Header>

			<AppShell.Navbar p="md">
				<AppShell.Section grow component={ScrollArea}>
					<Text c="dimmed">Questions</Text>
					<Group gap={4}>
						<Group gap={6}>
							<IconBan width="1rem" /> <Text size="sm">1</Text>
						</Group>
						<Text size="sm">Yes/No</Text>
					</Group>
				</AppShell.Section>
				<AppShell.Section grow component={ScrollArea}>
					<Text c="dimmed">Thank you page</Text>
					<Text size="sm">Page 1</Text>
				</AppShell.Section>
			</AppShell.Navbar>

			<AppShell.Main>Placeholder</AppShell.Main>

			<AppShell.Aside p="md">
				<Tabs defaultValue="content" variant="default" radius="md">
					<Tabs.List mb={12}>
						<Tabs.Tab value="content">Content</Tabs.Tab>
						<Tabs.Tab value="logic">Logic</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="content">Placholder</Tabs.Panel>

					<Tabs.Panel value="logic">Another Placholder</Tabs.Panel>
				</Tabs>
			</AppShell.Aside>
		</AppShell>
	);
};
