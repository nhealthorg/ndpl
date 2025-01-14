import { defineCommand } from 'citty'
import consola from 'consola'
//https://github.com/SBoudrias/Inquirer.js
import { select } from '@inquirer/prompts';
import yoctoSpinner from 'yocto-spinner';
import FormData from 'form-data';
import { initDocker, getImagesChoices } from '../utils/docker';

const ndplServer = 'http://localhost:3000';

const command = defineCommand({
	meta: {
	  name: 'image',
	  description: 'Create docker images for a ndpl project',
	},
	args: {
	},
	async run(ctx) {

		const docker = await initDocker();

		const imagesChoices = await getImagesChoices(docker);

		const imageTag = await select({
			message: 'Select a container',
			choices: imagesChoices
		});
		const spinner = yoctoSpinner({text: 'Sending image…'}).start();
		try {
			const image = docker.getImage(imageTag)
			const imageData = await image.inspect()
			// send image to ndplserver
			image.get(async (err, stream) => {
				if (err) {
					spinner.stop();
					consola.error('Error while getting image')
					return;
				}
				const formData = new FormData();
				formData.append('file', stream, {
					filename: `${imageTag}.tar`,
					filepath: `${imageTag}.tar`,
					contentType: 'application/x-tar',
					knownLength: formData.getLengthSync()
				  });
				  formData.submit(`${ndplServer}/api/images/upload`, (err, res) => {
					if (err) {
						spinner.stop();
						consola.error('Error while sending image')
						return;
					}
					spinner.stop();
					consola.success('Image sent successfully')
					return
				  })
			});
		} catch (error) {
			consola.error('Error while ')
			return;
		}
	}
})

export default command;