import fs from 'node:fs';

const saveFile = async (path: string, file: Buffer, event: (progress: number) => void): Promise<void> => {
	const fileStream = fs.createWriteStream
	(path);
	const totalSize = file.length;
	let uploadedSize = 0;
	const chunkSize = 1024 * 1024;
	const chunks = Math.ceil(totalSize / chunkSize);
	for (let i = 0; i < chunks; i++) {
		const start = i * chunkSize;
		const end = Math.min(totalSize, start + chunkSize);
		fileStream.write(file.slice(start, end));
		uploadedSize += end - start;
		event(uploadedSize / totalSize);
	}
}

export default defineEventHandler(async(event) => {
	const body = await readMultipartFormData(event);
	const file = (body! as any[]).shift();

	const fileName = `${crypto.randomUUID()}.tar`;
	const filePath = `./src/.data/images/${fileName}`;

	await saveFile(filePath, file.data, (progress) => {
		console.log(`Progress: ${progress}`);
	});

	return filePath;
  });


