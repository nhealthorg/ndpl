import type { UserWithoutPassword } from "#shared/types";

export const useAuth = () => {
  const authUser = useState<UserWithoutPassword | null>("user", () => null);

  const setUser = (user: UserWithoutPassword | null) => {
    authUser.value = user;
  };

  const login = async (email: string, password: string, rememberMe: boolean) => {
    const data = await $fetch("/auth/login", {
      method: "POST",
      body: {
        email,
        password,
        rememberMe,
      },
    });

    setUser(data.user);

    return authUser;
  };

  const logout = async () => {
    const data = await $fetch("/auth/logout", {
      method: "POST",
    });

    setUser(data.user);
  };

  const me = async () => {
    if (!authUser.value) {
      try {
        const data = await $fetch("/auth/me", {
          headers: useRequestHeaders(["cookie"]) as HeadersInit,
        });

        setUser(data.user);
      } catch {
        setUser(null);
      }
    }

    return authUser;
  };

  return {
    login,
    logout,
    me,
    authUser
  };
};