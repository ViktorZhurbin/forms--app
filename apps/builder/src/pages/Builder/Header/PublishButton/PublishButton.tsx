import { Button, Tooltip } from "@mantine/core";
import { IconSend2 } from "@tabler/icons-react";
import { usePublishForm } from "~/pages/Builder/hooks/usePublishForm";

export const PublishButton = ({ onClick }: { onClick?: () => void }) => {
	const { publishForm, isLoading, isPublished, isDisabled } = usePublishForm();

	return (
		<Tooltip
			withArrow
			disabled={isLoading || isDisabled}
			label={
				isPublished
					? "Form is published"
					: "Make your changes visible to the world"
			}
		>
			<Button
				onClick={onClick ?? publishForm}
				loading={isLoading}
				loaderProps={{ type: "dots" }}
				disabled={isPublished || isDisabled}
				leftSection={<IconSend2 />}
				variant="default"
			>
				{isPublished ? "Published" : "Publish"}
			</Button>
		</Tooltip>
	);
};
