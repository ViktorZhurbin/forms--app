import {
	AppShell,
	Breadcrumbs,
	Group,
	ScrollArea,
	Tabs,
	Text,
} from "@mantine/core";
import { IconBan } from "@tabler/icons-react";
import { Link } from "wouter";

const breadcrumbs = [
	{ title: "My workspace", href: "/" },
	{ title: "Dummy form", href: "/forms/1/create" },
].map((item) => (
	<Link href={item.href} key={item.href}>
		<Text size="sm">{item.title}</Text>
	</Link>
));

export const Builder = () => {
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
				<Group h="100%" px="md">
					<Breadcrumbs separator=">">{breadcrumbs}</Breadcrumbs>
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
					<Tabs.List>
						<Tabs.Tab value="content">Content</Tabs.Tab>
						<Tabs.Tab value="logic">Logic</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="content">Gallery tab content</Tabs.Panel>

					<Tabs.Panel value="logic">Logic tab content</Tabs.Panel>
				</Tabs>
			</AppShell.Aside>
		</AppShell>
	);
};
