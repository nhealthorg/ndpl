<template>
	<div class="container mx-auto px-4 sm:px-10 py-8 space-y-8">
		<UBreadcrumb :items="breadcrumbItems" />
		<div>
			<h1 class="text-2xl font-bold">{{ project?.name }}</h1>
			<p class="mt-4 text-gray-600">{{ project?.description }}</p>
		</div>
		<div class="flex justify-between">
			<UNavigationMenu
				color="neutral"
				:items="navItems"
				:ui="{
					root: 'bg-gray-50 rounded-sm w-auto px-2'
				}"
			/>
			<div class="space-x-2">
				<UButton label="Edit" variant="subtle" color="neutral" />
				<UModal
					title="Delete Project"
					description="Are you sure you want to delete this project?">
					<UButton label="Delete" color="error" />
					<template #footer v-slot="{ close }">
						<div class="flex justify-end space-x-2 w-full">
							<UButton label="Cancel" variant="subtle" @click="close" color="neutral" />
							<UButton label="Delete" color="error" />
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

	const { params } = useRoute()

	const { data: project } = await useFetch(`/api/projects/${params.id}`, {
		method: 'GET',
	})

	const breadcrumbItems = ref([
		{ label: 'Home', to: '/' },
		{ label: 'Projects', to: '/' },
		{ label:  project.value?.name || 'Project' }
	])

	const navItems = ref([
		[
			{
				label: 'General',
				active: true
			},
			{
				label: 'Monitoring'
			},
			{
				label: 'Logs'
			}
		]
		])
</script>