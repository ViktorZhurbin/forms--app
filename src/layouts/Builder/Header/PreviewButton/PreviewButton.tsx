import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { useParams } from "wouter";
import { Preview } from "~/layouts/Builder/Preview/Preview";

export const PreviewButton = () => {
	const formId = useParams()?.id;

	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Button
				variant="default"
				color="dark.7"
				leftSection={<IconEye />}
				onClick={open}
			>
				Preview
			</Button>

			{!!formId && (
				<Modal
					fullScreen
					padding={0}
					opened={opened}
					withCloseButton={false}
					transitionProps={{ transition: "fade-down" }}
					onClose={close}
				>
					<Preview formId={formId} onClose={close} />
				</Modal>
			)}
		</>
	);
};
