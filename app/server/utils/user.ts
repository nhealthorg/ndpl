import { useDatabase } from "#imports";
import z from "zod";

export const UserSchema = z.object({
  id: z.number().optional(),
  email: z.string().email(),
  password: z.string(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional()
});

// type of user
export type User = z.infer<typeof UserSchema>;

export const useUser = () => {
  const { getDatabase } = useDatabase()
  const db = getDatabase()

  function validateUser(user: unknown, silent: boolean = true) {
    const result = UserSchema.safeParse(user);
    if (!result.success) {
      // silent logging
      if(silent) console.error(result.error.errors);
      else throw new Error(result.error.message);
    }
    return result.data;
  }

  async function getUserByEmail(email: string) {
    let user = await db.prepare("SELECT * FROM user WHERE email = ?").get(email);
    return validateUser(user);
  }

  async function createUser(user: User) {
    const valUser = validateUser(user, false);
    if(valUser){
      await db.prepare("INSERT INTO user (email, password) VALUES (?, ?)").run(valUser.email, await hashPassword(valUser.password));
    }
    return valUser;
  }

  async function getUserById(id: string) {
    const user = await db.prepare("SELECT * FROM user WHERE id = ?").get(id);
    return validateUser(user);
  }

  return {
    getUserByEmail,
    createUser,
    getUserById
  }
}