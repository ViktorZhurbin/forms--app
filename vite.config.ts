import react from "@vitejs/plugin-react-swc";
import million from "million/compiler";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		million.vite({ auto: true }),
		checker({ typescript: true }),
		react(),
	],
});
