<template>
	<div>
		<nav class="flex justify-end bg-white border-b border-gray-200 h-16 px-4 sm:px-10">
			<UButton icon="i-heroicons-plus" label="Create" color="primary" class="self-center" />
		</nav>
  	</div>
</template>
<script setup lang="ts">
	definePageMeta({
		middleware: ["user-only"],
	});
</script>