import z from "zod";

// schemas
export const UserSchema = z.object({
  id: z.number().optional(),
  email: z.string().email(),
  password: z.string(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  created_at: z.string().optional(),
});

export const ProjectSchema = z.object({
	id: z.number().optional(),
	name: z.string(),
	description: z.string().nullable().optional(),
	created_at: z.string().optional(),
});

export const ImageSchema = z.object({
	id: z.number().optional(),
	name: z.string(),
	description: z.string().nullable().optional(),
  filePath: z.string().nullable().optional(),
	created_at: z.string().optional(),
});

// types
export type User = z.infer<typeof UserSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Image = z.infer<typeof ImageSchema>;