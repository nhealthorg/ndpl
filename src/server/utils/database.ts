import Database from 'better-sqlite3';
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

export const useDatabase = () => {

	let _db: Database.Database;

	const getDatabase = () => {
		if (!_db) {
			_db = createDatabase();
		}

		return _db;
	};

	const createDatabase = () => {
		const { database } = useRuntimeConfig();
		mkdirSync(dirname(database.file), { recursive: true });
		_db = new Database(database.file);
		return _db;
	}

	return {
		getDatabase,
		createDatabase
	}
}