import reactSwc from "@vitejs/plugin-react-swc";
import million from "million/compiler";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		million.vite({ auto: true, telemetry: false }),
		checker({ typescript: true, enableBuild: true }),
		reactSwc(),
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					react: ["react", "react-dom"],
				},
			},
		},
	},
});
