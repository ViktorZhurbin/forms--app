const isDev = process.env.NODE_ENV === "development";

const FORM_URL_BASE = import.meta.env.PUBLIC_FORM_URL;
const GOOGLE_CLIENT_ID = import.meta.env.PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_NAME = import.meta.env.PUBLIC_GOOGLE_CLIENT_NAME;

export { isDev, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_NAME, FORM_URL_BASE };
