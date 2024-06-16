import {
	AppShell,
	Avatar,
	Button,
	Center,
	Group,
	Menu,
	SegmentedControl,
	Stack,
	Text,
	UnstyledButton,
} from "@mantine/core";
import {
	IconBolt,
	IconLayoutGrid,
	IconList,
	IconPlus,
	IconSettings,
} from "@tabler/icons-react";
import { useState } from "react";
import { navigate } from "wouter/use-browser-location";
import { FormsLayoutType } from "../../constants/forms";
import { FormsView } from "./FormView/FormsView";

export const Admin = () => {
	const [view, setView] = useState<FormsLayoutType>(FormsLayoutType.Grid);

	return (
		<AppShell header={{ height: 60 }} padding="md">
			<AppShell.Header>
				<Group h="100%" px="md" align="center" justify="space-between">
					<UnstyledButton
						onClick={() => {
							navigate("/");
						}}
					>
						Logo
					</UnstyledButton>
					<Group align="center" gap={8}>
						<Button variant="default" leftSection={<IconBolt color="orange" />}>
							Upgrade
						</Button>
						<Menu shadow="md" width={200} offset={4}>
							<Menu.Target>
								<Avatar component={UnstyledButton} />
							</Menu.Target>

							<Menu.Dropdown>
								<Menu.Item leftSection={<IconSettings />}>Settings</Menu.Item>
								<Menu.Divider />
								<Menu.Item>What's new</Menu.Item>
								<Menu.Divider />
								<Menu.Item>Log out</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</Group>
				</Group>
			</AppShell.Header>

			<AppShell.Main>
				<Stack>
					<Group justify="space-between" align="center">
						<SegmentedControl
							data={[
								{
									label: (
										<Center style={{ gap: 6 }}>
											<IconList />
											<span>List</span>
										</Center>
									),
									value: "list",
								},
								{
									label: (
										<Center style={{ gap: 6 }}>
											<IconLayoutGrid />
											<span>Grid</span>
										</Center>
									),
									value: "grid",
								},
							]}
							value={view}
							onChange={(value) => {
								setView(value as FormsLayoutType);
							}}
						/>
						<Button
							leftSection={<IconPlus />}
							onClick={() => {
								navigate("/forms/id/create");
							}}
						>
							Create form
						</Button>
					</Group>
					<Text tt="uppercase" c="dimmed" size="xs" fw={500}>
						Your Forms
					</Text>
					<FormsView view={view} />
				</Stack>
			</AppShell.Main>
		</AppShell>
	);
};
