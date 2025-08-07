import { defineCommand } from 'citty'
//https://github.com/SBoudrias/Inquirer.js
import { select } from '@inquirer/prompts';
import yoctoSpinner from 'yocto-spinner';
import { initDocker, getImagesChoices, publishImage } from '../utils/docker';

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
		await publishImage(docker, imageTag);
		spinner.stop();
	}
})

export default command;