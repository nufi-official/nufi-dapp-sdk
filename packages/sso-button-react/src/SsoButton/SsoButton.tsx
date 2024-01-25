import cn from 'classnames'
import styles from './styles.module.css'
import {Icon} from '../Icon'
import type {LoginState, Theme, SupportedIcon} from './types'
import {supportedIcons} from './types'

const getDefaultTextContentByState = (
  showDefaultIconsWhenLoggedOut?: boolean,
): Record<LoginState, string> => ({
  error: 'Try again',
  logged_in: 'Connected',
  logged_out: showDefaultIconsWhenLoggedOut ? 'Sign in with' : 'Sign in',
})

export type SsoButtonProps = {
  onLogout?: () => void
  onLogin?: () => void
  isLoading?: boolean
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
  disableAction?: boolean
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
  isLoading,
  disableAction,
  ...rest
}: SsoButtonProps) {
  const textContent =
    label || getDefaultTextContentByState(showDefaultIconsWhenLoggedOut)[state]
  const commonBaseElementProps = {
    theme,
    classes,
    disabled: disableAction,
    isLoading,
    ...rest,
  }

  return (
    <>
      {
        <>
          {(() => {
            switch (state) {
              case 'logged_out': {
                return (
                  <BaseElement {...commonBaseElementProps} onClick={onLogin}>
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
                  </BaseElement>
                )
              }
              case 'logged_in': {
                const existsProviderIcon =
                  userInfo?.provider &&
                  supportedIcons.includes(userInfo.provider)

                const content =
                  userInfo?.provider && existsProviderIcon ? (
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
                  )
                return onLogout ? (
                  <LogoutButton
                    leftItem={
                      <BaseElement
                        {...{theme, classes, isLoading}}
                        noBaseRightRadius
                      >
                        {content}
                      </BaseElement>
                    }
                    disabled={commonBaseElementProps.disabled}
                    className={getBaseElementClassName({
                      isButton: true,
                      theme,
                      classes,
                    })}
                    title={logoutTooltip}
                    onClick={onLogout}
                  />
                ) : (
                  <BaseElement {...commonBaseElementProps}>
                    {content}
                  </BaseElement>
                )
              }
              case 'error': {
                return (
                  <BaseElement
                    onClick={onLogin}
                    {...commonBaseElementProps}
                    isError
                  >
                    <ContentWrapper
                      rightItem={textContent}
                      leftItem={
                        onLogin && !isLoading ? (
                          <Icon type="refresh" className={cn(styles.icon)} />
                        ) : null
                      }
                    />
                  </BaseElement>
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

type GetBaseElementClassNameArgs = {
  isButton: boolean
  noBaseRightRadius?: boolean
  classes: SsoButtonProps['classes']
  theme: Theme
}

const getBaseElementClassName = ({
  isButton,
  noBaseRightRadius,
  classes,
  theme,
}: GetBaseElementClassNameArgs) =>
  cn(
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
  )

type BaseElementProps = {
  isError?: boolean
  isLoading?: boolean
  disabled?: boolean
} & React.HTMLAttributes<HTMLElement> &
  Omit<GetBaseElementClassNameArgs, 'isButton'>

function BaseElement({
  theme,
  onClick,
  noBaseRightRadius,
  classes,
  isError,
  className,
  children,
  isLoading,
  disabled,
  ...rest
}: BaseElementProps) {
  const isButton = !!onClick

  const commonProps = {
    // data-error-state is used as a CSS selector
    'data-error-state': isError,
    onClick,
    className: cn(
      getBaseElementClassName({theme, noBaseRightRadius, isButton, classes}),
      className,
    ),
  }
  const Element = isButton ? 'button' : 'div'
  return (
    <Element
      {...commonProps}
      {...rest}
      children={
        isLoading ? (
          <ContentWrapper
            rightItem={children}
            leftItem={<span className={styles.loader} />}
          />
        ) : (
          children
        )
      }
      {...(isButton && {disabled})}
    />
  )
}

type LogoutButtonProps = {
  leftItem: React.ReactNode
  title: string
  className?: string
  onClick: () => void
  disabled?: boolean
}

function LogoutButton({leftItem, className, ...rest}: LogoutButtonProps) {
  return (
    <div className={styles.logoutWrapper}>
      {leftItem}
      <button className={cn(className, styles.logoutButton)} {...rest}>
        <Icon type="logout" className={cn(styles.icon)} />
      </button>
    </div>
  )
}
