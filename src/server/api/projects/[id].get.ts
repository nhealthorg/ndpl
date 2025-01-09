

export default defineEventHandler(async (event) => {
	checkAuthentication(event);

	const id = getRouterParam(event, 'id');

	const { getProjectById} = useProject();


	return await getProjectById(id);
  });