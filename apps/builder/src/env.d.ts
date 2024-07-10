/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
	// import.meta.env.PUBLIC_FORM_URL
	readonly PUBLIC_FORM_URL: string;
	readonly PUBLIC_INSTANT_APP_ID: string;
	readonly PUBLIC_GOOGLE_CLIENT_NAME: string;
	readonly PUBLIC_GOOGLE_CLIENT_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
