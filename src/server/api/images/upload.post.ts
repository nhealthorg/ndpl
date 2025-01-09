

export default defineEventHandler(async(event) => {
	const body = await readMultipartFormData(event);

	console.log(body)

	const file = (body! as any[]).shift();

	const fileName = `${crypto.randomUUID()}`;
	const filePath = `${fileName}`;

	const imagesStorage = useStorage('images');

	console.log('> fileName =', fileName);
	console.log('> filePath =', filePath);

	await imagesStorage.setItemRaw(fileName, file.data);

	return filePath;
  });