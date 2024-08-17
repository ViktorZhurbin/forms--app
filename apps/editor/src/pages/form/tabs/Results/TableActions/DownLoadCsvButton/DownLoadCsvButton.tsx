import { ActionIcon, Tooltip } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

export const DownloadCsvButton = (props: { csv: string }) => {
	const { csv } = props;

	const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);

	return (
		<Tooltip withArrow disabled label={"Download all responses"}>
			<ActionIcon
				variant="default"
				component="a"
				href={url}
				download="responses.csv"
			>
				<IconDownload />
			</ActionIcon>
		</Tooltip>
	);
};
