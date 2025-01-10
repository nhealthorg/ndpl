import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
	declaration: true,
	failOnWarn: false,
	entries: [
	  	{
			input: './cli/index'
	 	},
	],
	rollup: {
		inlineDependencies: true,
		resolve: {
		  exportConditions: ['production', 'node'] as any,
		},
	},
	externals: [
	],
});