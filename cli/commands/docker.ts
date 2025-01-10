import { defineCommand } from 'citty'

const command = defineCommand({
	meta: {
	  name: 'docker',
	  description: 'Use docker to build and run the project',
	},
	args: {
	}
})