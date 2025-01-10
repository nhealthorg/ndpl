import { defineCommand } from 'citty'
import consola from 'consola'
import Docker from 'dockerode'
import inquirer from 'inquirer'

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

		inquirer.prompt([{
			name: 'container',
			message: 'Select a container',
			step: 1,
			type: 'list',
			choices: containers.map(container => container.Names.join(',')),

		}], async (answers) => {
			console.log(answers)
		})

	}
})

export default command;