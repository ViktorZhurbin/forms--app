import type { TForm } from "@/shared/models/form/schema/form";
import { deleteForm } from "@/shared/models/form/write";
import { ActionIcon, Checkbox, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import clsx from "clsx";
import { useState } from "react";
import { ConfirmationModal } from "~/components/modals/ConfirmationModal/ConfirmationModal";
import styles from "./DeleteFormButton.module.css";

export const DeleteFormButton = (props: {
	nanoId: TForm["nanoId"];
	className?: string;
	formName: TForm["name"];
}) => {
	const { nanoId, className, formName } = props;

	const [opened, modalActions] = useDisclosure();
	const [confirmed, setConfirmed] = useState(false);

	const handleDelete = () => {
		deleteForm({ nanoId });
		modalActions.close();
	};

	return (
		<>
			<ActionIcon
				variant="default"
				className={clsx(styles.root, className)}
				onClick={(event) => {
					event.preventDefault();
					modalActions.open();
				}}
			>
				<IconTrash />
			</ActionIcon>

			<ConfirmationModal
				opened={opened}
				onClose={modalActions.close}
				title="Delete form and responses?"
				onConfirm={handleDelete}
				confirmButtontext="Delete form"
				isConfirmDisabled={!confirmed}
			>
				<Stack>
					<Text size="sm">
						You're about to delete <b>{formName}</b>.
					</Text>
					<Text size="sm">
						All responses this form has collected will also be{" "}
						<Text component="span" c="red" fw="bold">
							deleted&nbsp;forever.
						</Text>
					</Text>
					<Checkbox
						checked={confirmed}
						label={
							<Text size="sm">
								Yes, delete form <b>and</b> all responses
							</Text>
						}
						onChange={(e) => {
							setConfirmed(e.currentTarget.checked);
						}}
					/>
				</Stack>
			</ConfirmationModal>
		</>
	);
};
