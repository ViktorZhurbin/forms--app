import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconEye } from "@tabler/icons-react";
import { Preview } from "~/layouts/Form/Preview/Preview";

export const PreviewButton = () => {
	const onClickPreview = () => {
		modals.open({
			fullScreen: true,
			withCloseButton: false,
			padding: 0,
			transitionProps: { transition: "fade-down" },
			children: <Preview onClose={modals.closeAll} />,
		});
	};

	return (
		<Button
			variant="default"
			color="dark.7"
			leftSection={<IconEye />}
			onClick={onClickPreview}
		>
			Preview
		</Button>
	);
};
