import { Alert } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import { ErrorType } from "~/constants/fieldError";
import styles from "./AlertError.module.css";

const errorByType = {
	[ErrorType.Required]: {
		message: (
			<>
				<b>Oops!</b> Please answer the question
			</>
		),
	},
	[ErrorType.EmailInvalid]: {
		message: "Hmm... That email doesn't look right",
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
