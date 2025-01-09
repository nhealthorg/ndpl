export default defineEventHandler(async (event) => {

	checkAuthentication(event);

	const { getProject } = useProject();


	return await getProject();
  });