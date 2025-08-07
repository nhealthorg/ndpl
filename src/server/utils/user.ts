import { useDatabase } from "#imports";
import { UserSchema, type User } from '#shared/db.schema'

export const useUser = () => {
  const { getDatabase } = useDatabase()
  const db = getDatabase()

  async function getUserByEmail(email: string) {
    let user = await db.prepare("SELECT * FROM user WHERE email = ?").get(email);
    return validateData<User>(user, UserSchema);
  }

  async function createUser(user: User) {
    const valUser = validateData<User>(user, UserSchema, false);
    if(valUser){
      await db.prepare("INSERT INTO user (email, password) VALUES (?, ?)").run(valUser.email, await hashPassword(valUser.password));
    }
    return valUser;
  }

  async function getUserById(id: string) {
    const user = await db.prepare("SELECT * FROM user WHERE id = ?").get(id);
    return validateData<User>(user, UserSchema);
  }

  async function getUser() {
    const users = await db.prepare("SELECT * FROM user").all();
    return validateData<User[]>(users, UserSchema);
  }

  return {
    getUserByEmail,
    createUser,
    getUserById,
    getUser
  }
}