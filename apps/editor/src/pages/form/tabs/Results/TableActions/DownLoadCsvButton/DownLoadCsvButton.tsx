import { ActionIcon, type ActionIconProps, Tooltip } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

export const DownloadCsvButton = (
	props: {
		csv: string;
		tooltip: string;
	} & Partial<ActionIconProps>,
) => {
	const { csv, tooltip, ...actionIconProps } = props;

	const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);

	return (
		<Tooltip withArrow label={tooltip}>
			<ActionIcon
				variant="default"
				{...(actionIconProps || {})}
				component="a"
				href={url}
				download="responses.csv"
			>
				<IconDownload />
			</ActionIcon>
		</Tooltip>
	);
};
