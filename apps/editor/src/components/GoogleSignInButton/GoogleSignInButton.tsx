import { db } from "@/shared/models/db";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_NAME } from "~/utils/env";

export const GoogleSignInButton = ({
	onSuccess,
}: { onSuccess?: () => void }) => {
	const [nonce] = useState(crypto.randomUUID());

	return (
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
			<GoogleLogin
				// useOneTap
				nonce={nonce}
				onError={() => alert("Login failed")}
				onSuccess={({ credential }) => {
					if (!credential) return;

					db.auth
						.signInWithIdToken({
							clientName: GOOGLE_CLIENT_NAME,
							idToken: credential,
							// Make sure this is the same nonce you passed as a prop
							// to the GoogleLogin button
							nonce,
						})
						.then(() => {
							onSuccess?.();
						})
						.catch((err) => {
							alert(`Uh oh: ${err.body?.message}`);
						});
				}}
			/>
		</GoogleOAuthProvider>
	);
};
