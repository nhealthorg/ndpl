<template>
 	<div>
		<header class='flex shadow-md py-3 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
			<div class='flex justify-between gap-5 w-full'>
				<NuxtLink to="/"><img src="/nhealth_light.png" class="w-28" /></NuxtLink>
				<UDropdownMenu
					:items="items"
					:content="{
						side: 'bottom'
					}">
					<UButton icon="i-heroicons-cog-6-tooth" color="neutral" variant="subtle" class="cursor-pointer self-center" label="System" />
				</UDropdownMenu>
			</div>
		</header>
		<main>
			<slot />
		</main>
  	</div>
</template>
<script setup lang="ts">
    import type { DropdownMenuItem } from '#ui/types'

	const { logout } = useAuth();

    interface Item  extends DropdownMenuItem {
      slot?: 'account'
      action?: 'signout' | 'link'
      icon?: string
      t?: string
      disabled?: boolean
    }
    const items = [
      [{
        label: 'Account',
        slot: 'account',
        type: 'label'
      }],
      [{
        label: 'Sign out',
        action: 'signout',
        icon: 'i-heroicons-arrow-left-on-rectangle',
		async onSelect(e: Event) {
    		e.preventDefault()
			try {
				await logout();
				await navigateTo("/login");
			} catch (error) {
				console.error(error);
			}
  		}
      }]
    ] as [Item][]
</script>