import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { Preview } from "~/layouts/Builder/Preview/Preview";
import { useFormId } from "../../hooks/useFormId";

export const PreviewButton = () => {
	const formId = useFormId();

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
					<Preview onClose={close} />
				</Modal>
			)}
		</>
	);
};
