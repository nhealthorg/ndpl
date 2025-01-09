import type { H3Event } from "h3";

export async function getUserFromSession(event: H3Event) {
  const config = useRuntimeConfig(event);
  const { getUserById } = useUser();

  const cookie = getCookie(event, config.cookieName);
  if (!cookie) return null;

  const unsignedSession = unsign(cookie, config.cookieSecret);
  if (!unsignedSession) return null;

  const session = deserialize(unsignedSession);

  return getUserById(session.userId);
}

export function isAuthenticated(event: H3Event) {
  return Boolean(event.context.user);
}

export function checkAuthentication(event: H3Event) {
  if (!isAuthenticated(event)) {
    throw createError({
      statusCode: 401,
      message: "You don't have the rights to access this resource",
    });
  }
}