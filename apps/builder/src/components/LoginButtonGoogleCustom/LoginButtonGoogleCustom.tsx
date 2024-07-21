import { db } from "@/shared/models/db";
import { Button } from "@mantine/core";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { GOOGLE_CLIENT_NAME } from "~/utils/env";

export const LoginButtonGoogleCustom = ({
	redirectTo,
}: { redirectTo: string }) => {
	const url = db.auth.createAuthorizationURL({
		clientName: GOOGLE_CLIENT_NAME,
		redirectURL: redirectTo,
	});

	return (
		<Button href={url} component="a" leftSection={<IconBrandGoogleFilled />}>
			Sign in with Google
		</Button>
	);
};
