import type {Meta, StoryObj} from '@storybook/react'
import {SsoButton, SsoButtonProps} from '../SsoButton'
import demoStyles from './story.module.css'

type StoryProps = SsoButtonProps

const meta: Meta<StoryProps> = {
  title: 'Core/SsoButton',
  component: SsoButton,
  decorators: (Story, {args}) => (
    <div
      style={{
        padding: '3em',
        background: args.theme === 'dark' ? 'black' : 'white',
      }}
    >
      <Story />
    </div>
  ),
}
export default meta

type Story = StoryObj<StoryProps>

export const Basic: Story = {
  args: {
    state: 'logged_out' as const,
  },
}

export const BasicWithoutLoginMethods: Story = {
  args: {
    state: 'logged_out' as const,
    // these are optional props
    // but needs to be explicitly set as 'undefined' for storybook
    onLogout: undefined,
    onLogin: undefined,
  },
}

export const LoadingState: Story = {
  args: {
    state: 'logged_out' as const,
    isLoading: true,
  },
}

export const LoggedInWithProviderIcon: Story = {
  args: {
    state: 'logged_in' as const,
    showDefaultIconsWhenLoggedOut: false,
    userInfo: {
      provider: 'google',
    },
  },
}

export const CustomLabel: Story = {
  args: {
    state: 'logged_in' as const,
    showDefaultIconsWhenLoggedOut: false,
    label: 'custom label',
  },
}

export const CustomDimsViaClassName: Story = {
  args: {
    state: 'logged_out' as const,
    classes: {base: demoStyles.dimsOverride},
  },
}

export const CustomColorViaClassName: Story = {
  args: {
    state: 'logged_out' as const,
    classes: {
      // applied to all elements
      base: demoStyles.customColor,
      // applied only when element is button (interactive)
      button: demoStyles.customButtonColor,
    },
  },
}
