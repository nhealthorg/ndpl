import Docker from 'dockerode'


export async function initDocker() {
	try {
		var docker = new Docker();
		await docker.ping();
		return docker;
	} catch (error) {
		return null;
	}
}

export async function getImagesChoices(docker: Docker) {
	try {
		var images = await docker.listImages({
			all: true
		})
	} catch (error) {
		return [];
	}
	return images.map(image => image.RepoTags[0] ? ({
		name: image.RepoTags.join(' '),
		value: image.RepoTags[0]
	}) : null).filter(Boolean);
}