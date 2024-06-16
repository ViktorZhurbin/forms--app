import { Group, TextInput } from "@mantine/core";
import { HomeButton } from "./HomeButton/HomeButton";
import { PreviewButton } from "./PreviewButton/PreviewButton";
import { PublishButton } from "./PublishButton/PublishButton";

export const Header = () => {
	return (
		<Group h="100%" px="md" justify="space-between">
			<Group>
				<HomeButton />
				<TextInput pointer defaultValue="My form" size="sm" />
			</Group>
			<Group>
				<PreviewButton />
				<PublishButton />
			</Group>
		</Group>
	);
};
