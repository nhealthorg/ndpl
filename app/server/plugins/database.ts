import { $getMigrations } from '#imports'
import { migrate } from '@blackglory/better-sqlite3-migrations'

export default defineNitroPlugin(async () => {
	const { getDatabase } = useDatabase()
	const db = getDatabase()

	const migrations = $getMigrations()
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