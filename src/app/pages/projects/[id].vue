<template>
	<div class="container mx-auto px-4 sm:px-10 py-8 space-y-8">
		<UBreadcrumb :items="breadcrumbItems" />
		<div class="flex justify-between border-b border-gray-200 pb-4">
			<div>
				<h1 class="text-lg font-bold">{{ project?.name }}</h1>
				<p class="mt-4 text-gray-600">{{ project?.description }}</p>
				<p class="text-sm text-gray-500">Created on {{ project?.created_at }}</p>
			</div>
			<div class="space-x-2">
				<UButton label="Edit" variant="subtle" color="neutral" />
				<UModal
					title="Delete Project"
					description="Are you sure you want to delete this project?">
					<UButton label="Delete" color="error" />
					<template #footer>
						<div class="flex justify-end space-x-2 w-full">
							<UButton label="Cancel" variant="subtle" @click="modal.close()" color="neutral" />
							<UButton label="Delete" @click="deleteProject" color="error" />
						</div>
					</template>
				</UModal>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">

	definePageMeta({
		middleware: ["user-only"],
	});

	const modal = useModal()

	const { params } = useRoute()
	const router = useRouter()

	const { data: project } = await useFetch(`/api/projects/${params.id}`, {
		method: 'GET',
	})

	const breadcrumbItems = ref([
		{ label: 'Home', to: '/' },
		{ label: 'Projects', to: '/projects' },
		{ label:  project.value?.name || 'Project' }
	])


	async function deleteProject() {
		const { data, error } = await useFetch(`/api/projects/${params.id}`, {
			method: 'DELETE'
		})
		console.log(data.value, error.value)
		if (data.value?.status === 200) {
			router.push('/projects')
		}
	}
</script>