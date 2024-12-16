<template>
 	<div>
		<header class='flex shadow-md py-3 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
			<div class='flex justify-between gap-5 w-full'>
				<NuxtLink to="/"><img src="/nhealth_light.png" class="w-36" /></NuxtLink>
				<UDropdownMenu
					:items="items"
					:content="{
						side: 'bottom'
					}">
					<div class="flex py-3 px-1 items-center cursor-pointer">
						<UAvatar class="flex-none" src="/placeholder_profile_square.jpg" />
						<div class="flex-auto text-sm font-normal px-2">
							{{ user?.displayName }}
						</div>
					</div>
				</UDropdownMenu>
			</div>
		</header>
		<slot />
  	</div>
</template>
<script setup lang="ts">
    import type { DropdownMenuItem } from '#ui/types'

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
        icon: 'i-heroicons-arrow-left-on-rectangle'
      }]
    ] as [Item][]

	const user = {
		displayName: 'John Doe'
	}
</script>