import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSourceBuild } from "@rsbuild/plugin-source-build";
import { pluginTypeCheck } from "@rsbuild/plugin-type-check";
import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";

export default defineConfig({
	html: {
		template: "./static/index.html",
	},
	source: {
		entry: {
			index: "./src/main.tsx",
		},
	},
	plugins: [pluginReact(), pluginTypeCheck(), pluginSourceBuild()],

	performance: {
		chunkSplit: {
			strategy: "split-by-experience",
			// forceSplitting: {
			// 	"lib-ui": /node_modules[\\/](@mantine[\\/]*|@tabler\/*)/,
			// 	"lib-instant": /node_modules[\\/]@instantdb\/*/,
			// },
		},
	},

	tools: {
		rspack(config, { appendPlugins }) {
			// Only register the plugin when RSDOCTOR is true, as the plugin will increase the build time.
			if (process.env.RSDOCTOR) {
				appendPlugins(
					new RsdoctorRspackPlugin({
						// plugin options
					}),
				);
			}
		},
	},
});
