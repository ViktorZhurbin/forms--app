import { Button } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { navigate } from "wouter/use-browser-location";
import { useSelectedBlockId } from "../../hooks/useSelectedBlockId";

export const PreviewButton = () => {
	const selectedBlockId = useSelectedBlockId();

	return (
		<Button
			variant="default"
			color="#6b7280"
			leftSection={<IconEye style={{ width: "1.2rem", height: "1.2rem" }} />}
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
