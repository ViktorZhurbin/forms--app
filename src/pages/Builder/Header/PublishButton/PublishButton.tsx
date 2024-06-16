import { Button, Tooltip } from "@mantine/core";

export const PublishButton = () => {
	return (
		<Tooltip
			withArrow
			arrowSize={6}
			label="Make your changes visible to the world"
		>
			<Button color="rgb(31, 41, 55)">Publish</Button>
		</Tooltip>
	);
};
