<template>
	<div>
		<nav class="flex justify-end bg-white border-b border-gray-200 h-16 px-4 sm:px-10">
			<UButton icon="i-heroicons-plus" label="Project" color="primary" class="self-center" />
		</nav>
		<section>
			<div class="container mx-auto px-4 sm:px-10 py-8 space-y-8">
				<h1 class="text-2xl font-bold">Projects</h1>
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
	definePageMeta({
		middleware: ["user-only"],
	});

	const { data: projects } = useFetch('/api/projects', {
		method: 'GET',
	})
</script>