import { defineCommand } from 'citty'
import consola from 'consola'
import Docker from 'dockerode'
//https://github.com/SBoudrias/Inquirer.js
import { select } from '@inquirer/prompts';

const command = defineCommand({
	meta: {
	  name: 'image',
	  description: 'Create docker images for a ndpl project',
	},
	args: {
	},
	async run(ctx) {
		var docker = new Docker();

		const containers = await docker.listContainers({
			all: true
		})

		const answer = await select({
			message: 'Select a container',
			choices: containers.map(container => container.Names.join(',')),
		});

	}
})

export default command;