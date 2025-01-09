import { useProject } from '#imports';
import { ProjectSchema } from '#shared/schema';


export default defineEventHandler(async (event) => {
	checkAuthentication(event);

	const validatedResult = await readValidatedBody(event, ProjectSchema.safeParse)
	if (!validatedResult.success) {
	  throw validatedResult.error
	}

	const { createProject } = useProject();

	const project = await createProject(validatedResult.data);

	return project;
});