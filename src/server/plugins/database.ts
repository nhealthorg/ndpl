import { $getMigrations, useRuntimeConfig } from '#imports'
import { migrate } from '@blackglory/better-sqlite3-migrations'

export default defineNitroPlugin(async () => {
	const { forceLatestMigration } = useRuntimeConfig().database
	const { getDatabase } = useDatabase()
	const db = getDatabase()

	const migrations = $getMigrations()
	// Migrate database and force migration to latest -> sometimes useful for development
	if(forceLatestMigration && migrations.length > 0){
		console.log('Force latest Migration: Downgrade database to latest version', migrations.length-2)
		migrate(db, migrations, migrations.length-2)
	}
	migrate(db, migrations)

	// Add admin user if not exists
	const { admin } = useRuntimeConfig()
	const { getUserByEmail, createUser } = useUser()
	const user = await getUserByEmail(admin.email)
	if(!user){
		await createUser({
			email: admin.email,
			password: admin.password
		})
	}
})