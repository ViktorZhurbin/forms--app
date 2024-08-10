import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSourceBuild } from "@rsbuild/plugin-source-build";
import { pluginTypeCheck } from "@rsbuild/plugin-type-check";
import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";

export default defineConfig(({ env, command, envMode }) => {
	const isDev = env === "development";

	// https://rsbuild.dev/config/output/css-modules#template-string
	const localIdentName = isDev
		? "[folder]__[local]-[hash:base64:6]"
		: "[local]-[hash:base64:6]";

	return {
		html: {
			template: "./static/index.html",
		},
		source: {
			entry: {
				index: "./src/main.tsx",
			},
		},
		plugins: [pluginReact(), pluginTypeCheck(), pluginSourceBuild()],

		output: {
			cssModules: {
				localIdentName,
			},
		},

		performance: {
			chunkSplit: {
				strategy: "split-by-experience",
				forceSplitting: {
					"lib-ui": /node_modules[\\/](@mantine|@floating-ui|@tabler)\/*/,
					"lib-instant": /node_modules\/(@instantdb|object-hash|immer)\/*/,
					"lib-ui-extras": /node_modules\/(@dnd-kit|swiper)\/*/,
				},
			},
		},

		tools: {
			rspack(config, { appendPlugins }) {
				// Only register the plugin when RSDOCTOR is true, as the plugin will increase the build time.
				if (process.env.RSDOCTOR) {
					appendPlugins(
						new RsdoctorRspackPlugin({
							// plugin options
							supports: {
								generateTileGraph: true,
							},
							linter: {
								rules: {
									"ecma-version-check": "off",
								}
							}
						})
					);
				}
			},
		},
	};
});
