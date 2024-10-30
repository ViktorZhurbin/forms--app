import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Forms | Home`,
  },
  // graphqlTypegen: true,
  plugins: ["gatsby-plugin-postcss"],
};

export default config;
