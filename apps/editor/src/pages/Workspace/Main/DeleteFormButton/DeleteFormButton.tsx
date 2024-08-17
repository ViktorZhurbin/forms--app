import type { TForm } from "@/shared/models/form/schema/form";
import { deleteForm } from "@/shared/models/form/write";
import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import clsx from "clsx";
import styles from "./DeleteFormButton.module.css";

export const DeleteFormButton = (props: {
	nanoId: TForm["nanoId"];
	className?: string;
}) => {
	const { nanoId, className } = props;

	return (
		<ActionIcon
			variant="default"
			className={clsx(styles.root, className)}
			onClick={(event) => {
				event.preventDefault();

				deleteForm({ nanoId });
			}}
		>
			<IconTrash />
		</ActionIcon>
	);
};
