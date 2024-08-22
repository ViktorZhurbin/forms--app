import { Alert } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import { ErrorType } from "~/constants/fieldError";
import styles from "./AlertError.module.css";

const errorByType = {
	[ErrorType.Required]: {
		message: (
			<span>
				<b>Oops!</b> Please answer the question
			</span>
		),
	},
	[ErrorType.EmailInvalid]: {
		message: <span>Hmm... That email doesn't look right</span>,
	},
};

export const AlertError = (props: { errorType: ErrorType }) => {
	const { errorType } = props;

	return (
		<Alert
			color="red"
			variant="light"
			classNames={{ root: styles.root, icon: styles.icon }}
			icon={<IconAlertTriangle />}
		>
			{errorByType[errorType]?.message}
		</Alert>
	);
};
