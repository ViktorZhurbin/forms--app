import { Button } from "@mantine/core";
import { db } from "~/models/db";
import { GOOGLE_CLIENT_NAME } from "~/utils/env";

export const LoginButtonGoogleCustom = ({
	redirectTo,
}: { redirectTo: string }) => {
	const url = db.auth.createAuthorizationURL({
		clientName: GOOGLE_CLIENT_NAME,
		redirectURL: redirectTo,
	});

	return (
		<Button href={url} component="a">
			Sign in with Google
		</Button>
	);
};
