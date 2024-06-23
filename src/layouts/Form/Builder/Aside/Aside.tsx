import { Tabs } from "@mantine/core";

export const Aside = () => {
	return (
		<Tabs defaultValue="content" variant="default" radius="md">
			<Tabs.List mb={12}>
				<Tabs.Tab value="content">Content</Tabs.Tab>
				<Tabs.Tab value="logic">Logic</Tabs.Tab>
			</Tabs.List>

			<Tabs.Panel value="content">Placholder</Tabs.Panel>

			<Tabs.Panel value="logic">Another Placholder</Tabs.Panel>
		</Tabs>
	);
};
