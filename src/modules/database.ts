import { defineNuxtModule, createResolver, addTemplate, addServerImports } from '@nuxt/kit'
import { findMigrationFilenames, readMigrationFile } from 'migration-files'
import type { IMigration } from 'migration-files'

// Handle database migration files
export default defineNuxtModule({
	meta: {
		name: 'database',
		configKey: 'database',
	},
	defaults: {
		name: 'db',
		filePath: '.data',
		forceLatestMigration: false,
	},
	setup: async (options, nuxt) => {
		const resolver = createResolver(import.meta.url)
		// Find migration files
		const migrationFilenames = await findMigrationFilenames(resolver.resolve('../database/migrations'));

		// Read migration files
		const migrations = [] as IMigration[];
		for(const filename of migrationFilenames) {
			const migration = await readMigrationFile(filename);
			migrations.push(migration);
		}

		addTemplate({
			filename: 'database/migrations.ts',
			write: true,
			getContents: () => `
	import type { IMigration } from 'migration-files';

	export const getMigrations = () : IMigration[] => ${JSON.stringify(migrations)};
			`,
		})

		addServerImports([{
			name: 'getMigrations',
			as: '$getMigrations',
			from: resolver.resolve(nuxt.options.buildDir, 'database', 'migrations'),
		}])

		// Add runtime config
		nuxt.options.runtimeConfig = nuxt.options.runtimeConfig || {};
		nuxt.options.runtimeConfig.database = {
			file: resolver.resolve('..',options.filePath, `${options.name}.sqlite`),
			forceLatestMigration: options.forceLatestMigration,
		};
	}
})