import GoogleIcon from '../assets/google.svg?react'
import FacebookIcon from '../assets/facebook.svg?react'
import DiscordIcon from '../assets/discord.svg?react'
import TwitchIcon from '../assets/twitch.svg?react'

const _Icons = {
  google: [GoogleIcon, {viewBox: '0 0 32 32'}],
  facebook: [FacebookIcon, {viewBox: '0 0 32 32'}],
  discord: [DiscordIcon, {viewBox: '0 0 127.14 96.36'}],
  twitch: [TwitchIcon, {viewBox: '0 0 2400 2800'}],
} as const

type IconProps = {
  type: keyof typeof _Icons
  className?: string
  width?: number
  height?: number
}

export const Icon = ({type, ...rest}: IconProps) => {
  const [IconType, viewBox] = _Icons[type]
  return <IconType {...rest} {...viewBox} />
}
