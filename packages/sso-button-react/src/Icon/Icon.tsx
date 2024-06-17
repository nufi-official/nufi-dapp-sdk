import GoogleIcon from '../assets/google.svg?react'
import FacebookIcon from '../assets/facebook.svg?react'
import DiscordIcon from '../assets/discord.svg?react'
import RefreshIcon from '../assets/refresh.svg?react'
import LogoutIcon from '../assets/logout.svg?react'

const _Icons = {
  google: [GoogleIcon, {viewBox: '0 0 32 32'}],
  facebook: [FacebookIcon, {viewBox: '0 0 32 32'}],
  discord: [DiscordIcon, {viewBox: '0 0 127.14 96.36'}],
  refresh: [RefreshIcon, {viewBox: '0 0 24 24'}],
  logout: [LogoutIcon, {viewBox: '0 0 24 24'}],
} as const

export type IconProps = {
  type: keyof typeof _Icons
  className?: string
  width?: number
  height?: number
}

export const Icon = ({type, ...rest}: IconProps) => {
  const [IconType, viewBox] = _Icons[type]
  return <IconType {...rest} {...viewBox} />
}
