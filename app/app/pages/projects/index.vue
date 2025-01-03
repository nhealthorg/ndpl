<template>
	<div>
		<section>
			<div class="container mx-auto px-4 sm:px-10 py-8 space-y-8">
				<div class="flex justify-between items-center">
					<div>
						<h1 class="text-2xl font-bold">Projects</h1>
					</div>
					<UModal
						v-model:open="open"
						title="Create Project"
						description="Create a new project"
						>
						<UButton icon="i-heroicons-plus" label="Project" color="primary" class="self-center" />
						<template #body>
							<UForm ref="projectForm" :schema="ProjectSchema" :state="projectState" class="space-y-4" @submit="createProject">
								<UFormField label="Project Name" name="name">
									<UInput v-model="projectState.name" label="Project Name" placeholder="Enter project name" class="w-full" />
								</UFormField>
								<UFormField label="Description" name="description">
									<UTextarea v-model="projectState.description" label="Description" placeholder="Enter project description" class="w-full" />
								</UFormField>
							</UForm>
						</template>
						<template #footer>
							<div class="flex justify-end space-x-4 w-full">
								<UButton label="Cancel" color="neutral" />
								<UButton label="Save" @click="submit" type="submit" color="primary" />
							</div>
						</template>
					</UModal>
				</div>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
					<template v-for="project in projects" :key="project.id">
						<ProjectCard :project="project" />
					</template>
				</div>
			</div>
		</section>
  	</div>
</template>
<script setup lang="ts">
	import type { FormSubmitEvent } from '#ui/types'
	import { type Project, ProjectSchema } from '#shared/schema'


	definePageMeta({
		middleware: ["user-only"],
	});

	const { data: projects, refresh } = await useFetch('/api/projects', {
		method: 'GET',
	})

	const open = ref(false)

	const projectState = ref({
		name: undefined,
		description: undefined
	});

	const projectForm = useTemplateRef('projectForm')

	const submit = async () => {
		projectForm.value?.submit()
	}

	async function createProject(payload: FormSubmitEvent<Project>) {
		const { data, error } = await useFetch('/api/projects', {
			method: 'POST',
			body: projectState.value
		})

		if (!error) {
			projectState.value = {
				name: undefined,
				description: undefined
			}
			refresh()
		}
		open.value = false
	}
</script>