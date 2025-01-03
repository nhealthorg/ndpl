<template>
		<div class="container mx-auto px-4 sm:px-10 py-8 space-y-8">
			<div class="flex justify-between items-center">
				<div>
					<h1 class="text-2xl font-bold">Images</h1>
				</div>
				<UModal
					v-model:open="open"
					title="Add Docker Image"
					description="Manually upload a local generated Docker image"
					>
					<UButton icon="i-skill-icons:docker" label="Upload Image" color="neutral" variant="subtle" class="self-center" />
					<template #body>

					</template>
					<template #footer>
						<div class="flex justify-end space-x-4 w-full">
							<UButton label="Cancel" color="neutral" />
							<UButton label="Upload" type="submit" color="primary" />
						</div>
					</template>
				</UModal>
			</div>
		</div>
</template>
<script setup lang="ts">
	const open = ref(false)
</script>