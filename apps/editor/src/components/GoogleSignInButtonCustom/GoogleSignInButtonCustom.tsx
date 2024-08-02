import { db } from "@/shared/models/db";
import { Button } from "@mantine/core";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { useEffect, useRef } from "react";
import { GOOGLE_CLIENT_NAME } from "~/utils/env";

export const GoogleSignInButtonCustom = ({
	redirectTo,
	children,
}: {
	redirectTo: string;
	children: React.ReactNode;
}) => {
	const url = db.auth.createAuthorizationURL({
		clientName: GOOGLE_CLIENT_NAME,
		redirectURL: redirectTo,
	});

	const buttonRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		buttonRef.current?.focus();
	}, []);

	return (
		<Button
			ref={buttonRef}
			href={url}
			component="a"
			leftSection={<IconBrandGoogleFilled />}
		>
			{children}
		</Button>
	);
};
