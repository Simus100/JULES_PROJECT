import { config as defaultConfig } from "@remotion/eslint-config-flat";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...defaultConfig,
  {
    rules: {
      "@remotion/no-object-fit-on-media-video": "off",
    },
  },
];

export default config;
