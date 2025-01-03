<template>
 	<div>
		<header class='flex shadow-md py-3 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
			<div class='flex justify-between gap-5 w-full'>
				<div class="flex items-center gap-x-10">
					<NuxtLink to="/"><img src="/nhealth_light.png" class="w-36" /></NuxtLink>
					<UNavigationMenu :items="navItems" class="justify-center" />
				</div>
				<UDropdownMenu
					:items="systemItems"
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
    import type { DropdownMenuItem, NavigationMenuItem } from '#ui/types'

	const { logout } = useAuth();

    interface Item  extends DropdownMenuItem {
      slot?: 'account'
      action?: 'signout' | 'link'
      icon?: string
      t?: string
      disabled?: boolean
    }
    const systemItems = [
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

	const navItems = [
		{
			label: 'Projects',
			icon: 'i-heroicons-folder',
			to: '/projects',
			exact: false
		},
		{
			label: 'Images',
			icon: 'i-heroicons-cube',
			to: '/images',
		}
  	] as NavigationMenuItem[]
</script>