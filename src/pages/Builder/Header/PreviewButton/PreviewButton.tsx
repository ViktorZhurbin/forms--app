import { Button } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { navigate } from "wouter/use-browser-location";
import { useSelectedBlockId } from "../../hooks/useSelectedBlockId";

export const PreviewButton = () => {
	const selectedBlockId = useSelectedBlockId();

	return (
		<Button
			variant="default"
			color="dark.7"
			leftSection={<IconEye />}
			onClick={() => {
				navigate("/forms/1/preview", {
					state: { blockId: selectedBlockId },
				});
			}}
		>
			Preview
		</Button>
	);
};
