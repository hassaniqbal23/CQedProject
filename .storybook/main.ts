import type {StorybookConfig} from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
	stories: [
		"../components/**/*.mdx",
		"../components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	addons: [
		"@storybook/addon-onboarding",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@chromatic-com/storybook",
		"@storybook/addon-interactions",
		{
			name: '@storybook/addon-postcss',
			options: {
				postcssLoaderOptions: {
					implementation: require('postcss'),
				},
			},
		},
	],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
	staticDirs: ["../public"],
	webpackFinal: async (config) => {
		// Add PostCSS as a loader
		config?.module?.rules?.push({
			test: /\.css$/,
			use: [
				{ loader: 'style-loader' },
				{ loader: 'css-loader' },
				{
					loader: 'postcss-loader',
					options: {
						postcssOptions: {
							implementation: [require('postcss'), require('tailwindcss')],
						},
					},
				},
			],
			include: __dirname,
		});
		return config;
	},
};
export default config;
