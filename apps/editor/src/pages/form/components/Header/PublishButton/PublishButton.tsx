import { Button, Tooltip } from "@mantine/core";
import { IconSend2 } from "@tabler/icons-react";
import clsx from "clsx";
import { usePublishForm } from "~/pages/form/hooks/usePublishForm";
import styles from "./PublishButton.module.css";

export const PublishButton = ({ onClick }: { onClick?: () => void }) => {
	const { publishForm, isLoading, isPublished } = usePublishForm();

	return (
		<Tooltip
			withArrow
			disabled={isLoading}
			label={"Make your changes visible to the world"}
		>
			<Button
				onClick={onClick ?? publishForm}
				loading={isLoading}
				className={clsx({ [styles.hidden]: isPublished })}
				loaderProps={{ type: "dots" }}
				leftSection={<IconSend2 />}
				variant="default"
			>
				Publish
			</Button>
		</Tooltip>
	);
};
