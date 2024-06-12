import {
	ActionIcon,
	AppShell,
	Button,
	Group,
	NavLink,
	Pill,
	ScrollArea,
	Stack,
	Tabs,
	Text,
	TextInput,
	Tooltip,
} from "@mantine/core";
import { IconBan, IconEye, IconHome } from "@tabler/icons-react";
import { useLocation } from "wouter";

import { MultipleChoice } from "../../components/MultipleChoice/MultipleChoice";
import { QuestionColorsByGroup } from "../../constants/questionMaps";
import { type Question, QuestionType } from "../../constants/questions";
import { formFields } from "../../mocks/formQuestions";

const field = formFields[0];

const getComponentByQuestionType = (question: Question) => {
	switch (question.type) {
		case QuestionType.YesNo:
		case QuestionType.MultipleChoice:
			return (
				<MultipleChoice
					field={question}
					isLast={false}
					onSubmitForm={() => null}
					goToNextStep={() => null}
				/>
			);

		// case QuestionType.ShortText:

		default:
			return false;
	}
};

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
					<Text c="dimmed" size="sm" mb={8} p="0 12px">
						Questions
					</Text>
					<Stack gap={8}>
						{formFields.map(({ id, group, title }, index) => (
							<NavLink
								key={id}
								p="8px 12px"
								label={
									<Group gap={8}>
										<Pill
											p="0 6px"
											radius="md"
											bg={QuestionColorsByGroup[group]}
										>
											<Group wrap="nowrap" gap={8}>
												<IconBan /> <Text size="sm">{index + 1}</Text>
											</Group>
										</Pill>
										<Text size="sm" c="rgb(25, 25, 25)">
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
				{getComponentByQuestionType(field)}
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
