import type { CommandDef } from 'citty'

const _rDefault = (r: any) => (r.default || r) as Promise<CommandDef>

export const commands = {
	'image': () => import('./image').then(_rDefault),
} as const