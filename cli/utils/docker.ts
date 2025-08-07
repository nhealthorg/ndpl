import Docker from 'dockerode';
import consola from 'consola';
import FormData from 'form-data';

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

const ndplServer = 'http://localhost:3000';

export async function publishImage(docker: Docker, imageTag: string) : Promise<void> {
	// add promise
	return new Promise<void>(async (resolve, reject) => {
		try {
			const image = docker.getImage(imageTag)
			// request access token
			const resp = await fetch(`${ndplServer}/api/images/upload/token`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: imageTag
				})
			})
			const token = await resp.text()
			// send image to ndplserver
			image.get(async (err, stream) => {
				if (err) {
					consola.error('Error while getting image')
					return reject(err);
				}
				const formData = new FormData();
				formData.append('file', stream, {
					filename: `${imageTag}.tar`,
					filepath: `${imageTag}.tar`,
					contentType: 'application/x-tar',
					knownLength: formData.getLengthSync()
				});
				formData.submit(`${ndplServer}/api/images/upload?token=${token}`, (err, res) => {
					if (err) {
						consola.error('Error while sending image')
						return reject(err);
					}
					consola.success('Image sent successfully')
					return resolve();
				})
			});
		} catch (error) {
			consola.error('Error while ')
			return reject(error);
		}
	})
}