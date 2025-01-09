import z from 'zod';

export const validateData = <T>(data: unknown, schema: z.ZodType<any, any>, silent: boolean = true): T extends any[] ? T : T | undefined => {
  let result: z.SafeParseReturnType<any, any>;
  if (Array.isArray(data)) {
    result = schema.array().safeParse(data);
    if (result.success) {
      return result.data as T extends any[] ? T : never;
    }
  } else {
    result = schema.safeParse(data);
    if (result.success) {
      return result.data as T extends any[] ? never : T;
    }
  }
  if (!result.success && !silent) {
    throw new Error(result.error.message);
  }
  // @ts-ignore
  return undefined;
}