export default defineEventHandler(async (event) => {

  checkAuthentication(event);

  const { getUser } = useUser();

  const usersWithPassword = await getUser();

  return usersWithPassword ? usersWithPassword.map(({ password, ...user }) => user) : [];
});