import z from "zod";

export const ImageUploadTokenSchema = z.object({
	name: z.string(),
	desciption: z.string().default(""),
});

// types
export type ImageUploadToken = z.infer<typeof ImageUploadTokenSchema>;