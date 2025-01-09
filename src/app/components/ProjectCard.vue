<template>
	<ULink :to="`/projects/${project.id}`" raw class="bg-white border-1 border-gray-200 rounded-lg overflow-hidden hover:ring-1 hover:ring-blue-500 transition-all duration-100 hover:-translate-y-0.5 hover:shadow-md cursor-pointer">
		<div class="p-4 text-left">
			<h2 class="text-lg font-normal text-gray-600">{{ project.name }}</h2>
			<!-- created_at string is eg 2024-12-18 15:06:13, create html output with created less than a minute ago and so on -->
			<p class="mt-4 text-sm text-gray-600">{{ createdAt }}</p>
		</div>
	</ULink>
</template>
<script setup lang="ts">
	import type { Project } from '#shared/schema'
	import { formatDistanceToNow, parseISO } from 'date-fns'

	const props = defineProps<{
		project: Project
	}>()


	const createdAt = computed(() => {
		const date = parseISO(props.project?.created_at ?? '');
      	const distance = formatDistanceToNow(date, { addSuffix: true });
		if (distance.includes('less than a minute')) {
			return 'Created less than a minute ago';
		} else if (distance.includes('minute')) {
			return `Created ${distance}`;
		} else if (distance.includes('hour')) {
			return `Created ${distance}`;
		} else if (distance.includes('day')) {
			return `Created ${distance}`;
		} else {
			return `Created on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
		}
	})
</script>
