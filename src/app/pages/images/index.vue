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
						<UForm ref="imageForm" :schema="ImageSchema" :state="imageState" class="space-y-4" @submit="createImage">
								<UFormField label="Image Name" name="name">
									<UInput v-model="imageState.name" label="Image Name" placeholder="Enter image name" class="w-full" />
								</UFormField>
								<UFormField label="Image File" name="fileName">
									<UInput v-model="file" label="Image File" placeholder="Add Docker Image File" type="file" class="w-full" />
								</UFormField>
								<UFormField label="Description" name="description">
									<UTextarea v-model="imageState.description" label="Description" placeholder="Enter image description" class="w-full" />
								</UFormField>
						</UForm>
					</template>
					<template #footer>
						<div class="flex justify-end space-x-4 w-full">
							<UButton label="Cancel" color="neutral" />
							<UButton label="Upload" type="submit" color="primary" @click="submit" />
						</div>
					</template>
				</UModal>
			</div>
		</div>
</template>
<script setup lang="ts">
	import { type Image, ImageSchema } from '#shared/db.schema'

	definePageMeta({
		middleware: ["user-only"],
	});

	const open = ref(false)

	const imageState = ref({
		name: undefined,
		description: undefined
	});

	const imageForm = useTemplateRef('imageForm')

	const file = ref(null)

	const submit = async () => {
		if(file){
			const formData = new FormData();
			formData.append("file", file);
			const response = await $fetch('/api/images/upload', {
				method: 'POST',
				body: formData
			})
			console.log(response)
		}
		//imageForm.value?.submit()
	}

	const createImage = async () => {
		console.log(imageState.value)
	}
</script>