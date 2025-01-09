export default defineNuxtRouteMiddleware(async () => {
	const { authUser } = useAuth();

	if (authUser.value) {
	  if (import.meta.server) return navigateTo({ name: "index" });

	  return abortNavigation();
	}
});