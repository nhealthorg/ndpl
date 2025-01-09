export default defineNuxtRouteMiddleware(async () => {
	const { authUser } = useAuth();

	if (!authUser.value) return navigateTo({ name: "login" });
});