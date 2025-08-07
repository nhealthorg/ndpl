import { ImageUploadTokenSchema } from '#shared/api.schema'

/**
 * @api {post} /images/upload/token Upload Token
 * @apiName UploadToken
 * @apiGroup Images
 * @apiDescription Get a token to upload a Docker image
 */
export default defineEventHandler(async(event) => {
	const validatedResult = await readValidatedBody(event, ImageUploadTokenSchema.safeParse)
	if (!validatedResult.success) {
		throw validatedResult.error
	}
	const { getDatabase } = useDatabase();
	const db = getDatabase();

	const token = crypto.randomUUID();
	// Save token to database
	await db.prepare("INSERT INTO image (name, description, uploadToken, uploaded) VALUES (?, ?)").run(validatedResult.data.name, validatedResult.data.description, token, false);

	return token;
});