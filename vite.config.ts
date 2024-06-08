import reactSwc from "@vitejs/plugin-react-swc";
import million from "million/compiler";
import { defineConfig, mergeConfig } from "vite";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
	const isDev = command === "serve";
	const extraConfig = isDev ? getDevConfig() : getBuildConfig();

	return mergeConfig(extraConfig, {
		plugins: [
			million.vite({ auto: true, telemetry: false }),
			checker({ typescript: true, enableBuild: true }),
			reactSwc(),
		],
	});
});

function getDevConfig() {
	return defineConfig({
		css: {
			modules: {
				generateScopedName: "[folder]__[local]--[hash:base64:5]",
			},
		},
	});
}

function getBuildConfig() {
	return defineConfig({
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
}
