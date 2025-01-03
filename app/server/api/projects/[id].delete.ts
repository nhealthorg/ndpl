import { useProject } from '#imports';


export default defineEventHandler(async (event) => {
	checkAuthentication(event);

	const id = getRouterParam(event, 'id');

	if (!id) {
		throw new Error('Project ID is required');
	}

	const { deleteProject } = useProject();

	await deleteProject(id);

	return {
		status: 200,
		body: {
			message: 'Project deleted successfully',
		},
	};
});