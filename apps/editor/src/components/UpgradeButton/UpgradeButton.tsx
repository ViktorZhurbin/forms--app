import { Button } from "@mantine/core";
import { IconBolt } from "@tabler/icons-react";

export const UpgradeButton = () => {
	return (
		<Button
			disabled
			variant="default"
			leftSection={<IconBolt color="orange" />}
		>
			Upgrade
		</Button>
	);
};
