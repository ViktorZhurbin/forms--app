import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { db } from "~/models/db";

// e.g. 89602129-cuf0j.apps.googleusercontent.com
const GOOGLE_CLIENT_ID =
	"274668070468-eteo32o6t6f2ter5mnjlk04sv5b388rn.apps.googleusercontent.com";

// Use the google client name in the Instant dashboard auth tab
const GOOGLE_CLIENT_NAME = "google-forms-dev";

export const GoogleLoginButton = ({
	onSuccess,
}: { onSuccess?: () => void }) => {
	const [nonce] = useState(crypto.randomUUID());

	return (
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
			<GoogleLogin
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
