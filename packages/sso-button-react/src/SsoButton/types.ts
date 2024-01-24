import type {IconProps} from '../Icon'

export type Theme = 'light' | 'dark'

export const loginState = [
  'loading',
  'error',
  'logged_in',
  'logged_out',
] as const

export type LoginState = (typeof loginState)[number]

export const supportedIcons: IconProps['type'][] = [
  'google',
  'facebook',
  'discord',
  'twitch',
]

export type SupportedIcon = (typeof supportedIcons)[number]
