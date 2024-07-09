import { Button, Tooltip } from "@mantine/core";
import { IconSend2 } from "@tabler/icons-react";
import { usePublishForm } from "~/layouts/Builder/hooks/usePublishForm";

export const PublishButton = () => {
	const { publishForm, isLoading, isPublished } = usePublishForm();

	return (
		<Tooltip
			withArrow
			disabled={isLoading}
			label={
				isPublished
					? "Form is published"
					: "Make your changes visible to the world"
			}
			onClick={publishForm}
		>
			<Button
				loading={isLoading}
				disabled={isPublished}
				leftSection={<IconSend2 />}
				variant="default"
			>
				{isPublished ? "Published" : "Publish"}
			</Button>
		</Tooltip>
	);
};
