import cn from 'classnames'
import styles from './styles.module.css'
import {Icon} from '../Icon'
import type {LoginState, Theme, SupportedIcon} from './types'
import {supportedIcons} from './types'

const getDefaultTextContentByState = (
  showDefaultIconsWhenLoggedOut?: boolean,
): Record<LoginState, string> => ({
  loading: 'Connecting...',
  error: 'Try again',
  logged_in: 'Connected',
  logged_out: showDefaultIconsWhenLoggedOut ? 'Sign in with' : 'Sign in',
})

export type SsoButtonProps = {
  onLogout: () => void
  onLogin: () => void
  state: LoginState
  showDefaultIconsWhenLoggedOut?: boolean
  label?: string
  theme?: Theme
  userInfo?: {
    provider?: SupportedIcon
  }
  classes?: {
    base?: string
    button?: string
  }
  logoutTooltip?: string
} & Omit<React.HTMLAttributes<HTMLElement>, 'onClick' | 'className'>

export function SsoButton({
  state,
  onLogin,
  onLogout,
  classes,
  showDefaultIconsWhenLoggedOut = true,
  theme = 'light',
  label,
  userInfo,
  logoutTooltip = 'Log out',
  ...rest
}: SsoButtonProps) {
  const textContent =
    label || getDefaultTextContentByState(showDefaultIconsWhenLoggedOut)[state]

  const commonProps = ({
    isButton,
    noBaseRightRadius,
  }: {
    isButton: boolean
    noBaseRightRadius?: boolean
  }) => ({
    ...rest,
    // data-error-state is used as a CSS selector
    'data-error-state': state === 'error',
    className: cn(
      styles.baseReset,
      styles.base,
      classes?.base,
      isButton && classes?.button,
      noBaseRightRadius && styles.noRightRadius,
      {
        [styles.darkMode]: theme === 'dark',
        [styles.lightMode]: theme === 'light',
        [styles.button]: isButton,
        [styles.buttonDarkMode]: isButton && theme === 'dark',
        [styles.buttonLightMode]: isButton && theme === 'light',
      },
    ),
  })

  return (
    <>
      {
        <>
          {(() => {
            switch (state) {
              case 'logged_out': {
                return (
                  <button {...commonProps({isButton: true})} onClick={onLogin}>
                    {showDefaultIconsWhenLoggedOut ? (
                      <ContentWrapper
                        leftItem={textContent}
                        rightItem={
                          <span className={styles.iconsWrapper}>
                            {supportedIcons.map((iconType) => (
                              <Icon
                                type={iconType}
                                className={cn(styles.icon)}
                              />
                            ))}
                          </span>
                        }
                      />
                    ) : (
                      textContent
                    )}
                  </button>
                )
              }
              case 'logged_in': {
                const existsProviderIcon =
                  userInfo?.provider &&
                  supportedIcons.includes(userInfo.provider)
                return (
                  <div className={styles.logoutWrapper}>
                    <div
                      {...commonProps({
                        isButton: false,
                        noBaseRightRadius: true,
                      })}
                    >
                      {userInfo?.provider && existsProviderIcon ? (
                        <ContentWrapper
                          rightItem={textContent}
                          leftItem={
                            <Icon
                              type={userInfo.provider}
                              className={cn(styles.icon)}
                            />
                          }
                        />
                      ) : (
                        textContent
                      )}
                    </div>
                    <button
                      title={logoutTooltip}
                      className={cn(
                        commonProps({isButton: true}).className,
                        styles.logoutButton,
                      )}
                      onClick={onLogout}
                    >
                      <Icon type="logout" className={cn(styles.icon)} />
                    </button>
                  </div>
                )
              }
              case 'loading': {
                return (
                  <div {...commonProps({isButton: false})}>
                    <ContentWrapper
                      rightItem={textContent}
                      leftItem={<span className={styles.loader} />}
                    />
                  </div>
                )
              }
              case 'error': {
                return (
                  <button {...commonProps({isButton: true})} onClick={onLogin}>
                    <ContentWrapper
                      rightItem={textContent}
                      leftItem={
                        <Icon type="refresh" className={cn(styles.icon)} />
                      }
                    />
                  </button>
                )
              }
            }
          })()}
        </>
      }
    </>
  )
}

type ContentWrapperProps = {
  leftItem: React.ReactNode
  rightItem: React.ReactNode
}

function ContentWrapper({leftItem, rightItem}: ContentWrapperProps) {
  const renderItem = (item: React.ReactNode) =>
    typeof item === 'string' ? <span>{item}</span> : item

  return (
    <span className={styles.contentWrapper}>
      {renderItem(leftItem)}
      {renderItem(rightItem)}
    </span>
  )
}
