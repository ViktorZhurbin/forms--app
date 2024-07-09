export const isDev = process.env.NODE_ENV === "development";

const FORM_URL_DEV = "http://localhost:5174";
const FORM_URL_PROD = "https://forms--form.pages.dev";

export const formUrlBase = isDev ? FORM_URL_DEV : FORM_URL_PROD;
