import {
	ActionIcon,
	AppShell,
	Button,
	Group,
	NavLink,
	ScrollArea,
	Stack,
	Tabs,
	Text,
	TextInput,
	Tooltip,
} from "@mantine/core";
import { IconBan, IconEye, IconHome } from "@tabler/icons-react";
import { useEffect, useMemo } from "react";
import { useSearch } from "wouter";
import { navigate } from "wouter/use-browser-location";
import { Question } from "../../components/Question/Question";
import { SearchParams } from "../../constants/location";
import { QuestionColorsByGroup } from "../../constants/questionMaps";
import { formFields } from "../../mocks/formQuestions";

export const Builder = () => {
	const searchParams = useSearch();
	const selectedBlockId = useMemo(() => {
		const urlSearchParams = new URLSearchParams(searchParams);

		return urlSearchParams.get(SearchParams.BLOCK_ID);
	}, [searchParams]);

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(window.location.search);
		const searchBlockId = urlSearchParams.get(SearchParams.BLOCK_ID);
		const isValidBlockId = formFields.some(({ id }) => id === searchBlockId);

		if (searchBlockId && isValidBlockId) {
			return;
		}

		const defaultBlockId = formFields[0].id;

		urlSearchParams.set(SearchParams.BLOCK_ID, defaultBlockId);
		navigate(`?${urlSearchParams.toString()}`, { replace: true });
	}, []);

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
									navigate("/");
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
								navigate("/forms/1/preview", {
									state: { blockId: selectedBlockId },
								});
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
					<Text c="dimmed" size="sm" mb={8} p="0 12px">
						Questions
					</Text>
					<Stack gap={8}>
						{formFields.map(({ id, group, title }, index) => (
							<NavLink
								key={id}
								active={id === selectedBlockId}
								p="8px 12px"
								onClick={() => {
									const urlSearchParams = new URLSearchParams(
										window.location.search,
									);
									urlSearchParams.set(SearchParams.BLOCK_ID, id);

									navigate(`?${urlSearchParams.toString()}`);
								}}
								label={
									<Group gap={8}>
										<Group
											style={{ borderRadius: "6px" }}
											wrap="nowrap"
											gap={8}
											align="center"
											p="4px 6px"
											bg={QuestionColorsByGroup[group]}
										>
											<IconBan /> <Text size="xs">{index + 1}</Text>
										</Group>
										<Text size="sm" c="dark.4">
											{title}
										</Text>
									</Group>
								}
							/>
						))}
					</Stack>
				</AppShell.Section>
				<AppShell.Section grow component={ScrollArea}>
					<Text c="dimmed" size="sm" mb={8} p="0 12px">
						Thank you page
					</Text>
					<NavLink p="8px 12px" label="Page 1" />
				</AppShell.Section>
			</AppShell.Navbar>

			<AppShell.Main
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{selectedBlockId ? <Question id={selectedBlockId} /> : false}
			</AppShell.Main>

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
