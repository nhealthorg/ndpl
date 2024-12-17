<template>
    <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="flex justify-center">
            <img class="h-18 w-auto" src="/nhealth_light.png" alt="Workflow">
        </div>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
		<UCard :ui="{
            body: 'p-0 sm:px-0'
        }">
            <UForm
                class="space-y-6 p-4 sm:px-4"
				:state="state"
				:validateOn="['blur', 'input', 'change']"
				@submit="onSubmit"
                :schema="schema">
                <FhirOperationOutcomeAlert :outcome="errorOutcome" />
                <UFormField name="email" label="Email">
                    <UInput v-model="state.email" icon="i-heroicons-at-symbol" class="w-full"size="md" type="email" placeholder="Email"></UInput>
                </UFormField>

                <UFormField name="password" label="Password">
                    <UInput v-model="state.password" icon="i-heroicons-key" class="w-full" size="md" type="password" placeholder="Password"></UInput>
                </UFormField>
				<div>
                    <UButton type="submit" :loading="loading" label="Login"/>
                </div>
			</UForm>
		</UCard>
	  </div>
	</div>
</template>
<script setup lang="ts">
	import z from 'zod'
	import type { FormSubmitEvent } from '#ui/types'
    import type { Ref } from '#imports'

	definePageMeta({
		middleware: ["guest-only"],
		layout: false,
	});

    const { login } = useAuth();

    const loading = ref(false)

	const state = reactive({
        email: undefined,
        password: undefined
    })

    const schema = z.object({
        email: z.string({
            required_error: 'Email is required'
        }).email({ message: 'Invalid email address' }),
        password: z.string({
            required_error: 'Password is required'
        })
    })

    watch(() => loading, (value) => {
        console.log('loading', value)
    })

    const errorOutcome = ref(undefined) as Ref<string | undefined>;

    type AuthSchema = z.output<typeof schema>;

	async function onSubmit (payload: FormSubmitEvent<AuthSchema>) : Promise<void> {
        const { email, password } = payload.data;
        try {
            loading.value = true;
            await login(email, password, true);
            await navigateTo('/');
        } catch (error) {
            errorOutcome.value = error?.message || 'An error occurred';
        } finally {
            loading.value = false;
        }
    }
</script>