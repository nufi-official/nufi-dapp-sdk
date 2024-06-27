# NuFiConnect (Cardano)

Integrates your DApp with the NuFi web wallet injected into it is as a widget. Users can seamlessly onboard/log in into your DApp using social providers such as Google or Discord while being able to manage their wallet in the NuFi interface.

## Demo

Example dapp with the current version of SDK is deployed [here](https://sdk-example.nu.fi).

Example integration can be found in https://github.com/nufi-official/adaplays.xyz
which is a forked/updated version of playground cardano dapp.

We recommend to check usage of
`@nufi/dapp-client-core`, `@nufi/dapp-client-cardano` and `@nufi/sso-button-react` in
[File 1](https://github.com/nufi-official/adaplays.xyz/blob/main/components/navbar.tsx) and [File 2](https://github.com/nufi-official/adaplays.xyz/blob/main/pages/_app.tsx) where
most of the changes are contained. Alternatively just searching for the usage
of these libraries should showcase all relevant steps in the integration.

The other changes made to this repository are specific to its example dapp, so we do not recommend
focusing on them.


## Install packages

NPM

```
npm install @nufi/dapp-client-core
npm install @nufi/dapp-client-cardano
```

Yarn

```
yarn add @nufi/dapp-client-core
yarn add @nufi/dapp-client-cardano
```

## Usage

*Make sure that your app's Content Security Policy does not block the iframe that is injected by our SDK. For more info please check [iframe injection docs](./iframeInjection.md).*

### Initialize core SDK

```typescript
import nufiCoreSdk from '@nufi/dapp-client-core'

// preprod network (runs against staging version of NuFi)
nufiCoreSdk.init('https://wallet-testnet-staging.nu.fi')

// OR

// preview network (runs against staging version of NuFi)
nufiCoreSdk.init('https://wallet-preview-staging.nu.fi')

// OR

// mainnet network (runs against staging version of NuFi)
nufiCoreSdk.init('https://wallet-staging.nu.fi')
```

The `init` function has to be called before calling other functions from
`@nufi/dapp-client-core` or `@nufi/dapp-client-cardano` SDK.

Its advisable to call it as soon as possible as it will also prefetch the Widget,
and will make it appear faster when being requested later on.

If no origin is passed to `init` it defaults to `https://wallet.nu.fi`. Note that this default will not work until officially released.

For now please use the origin from the above example.

To customize Widget appearance (such as z-index), please
see [Widget options](./widgetOptions.md)

### Initialize SSO login for Cardano

```typescript
import nufiCoreSdk from '@nufi/dapp-client-core'
import {initNufiDappCardanoSdk} from '@nufi/dapp-client-cardano'

// Should be called before accessing `window.cardano.nufiSSO`
initNufiDappCardanoSdk(nufiCoreSdk, 'sso')
const api = await window.cardano.nufiSSO.enable()
```

When called like in the example above users will be asked to choose Web3Auth provider inside the NuFi
Widget. If you want to choose specific provider you can pass it using `provider`
parameter like this:

```typescript
import nufiCoreSdk from '@nufi/dapp-client-core'
import {initNufiDappCardanoSdk} from '@nufi/dapp-client-cardano'

// Should be called before accessing `window.cardano.nufiSSO`
initNufiDappCardanoSdk(nufiCoreSdk, 'sso', {provider: 'google'})
const api = await window.cardano.nufiSSO.enable()
```

You can currently choose `google` and `discord` providers.

The `initNufiDappCardanoSdk` will populate `window.cardano.nufiSSO` object
which has methods corresponding to CIP-30 standard.

See [multiple providers docs](./multipleProviders.md)
to use `initNufiDappCardanoSdk` correctly, when supporting multiple providers.

### Listening to social login info changes

You can listen to the changes of current social login info using the following:

```typescript
import nufiCoreSdk from '@nufi/dapp-client-core'

const currentSSOInfo = nufiCoreSdk.getApi().onSocialLoginInfoChanged((data) => {
  // Store data in your app
})
```

Alternatively you can call:

```typescript
import nufiCoreSdk from '@nufi/dapp-client-core'

const currentSSOInfo = nufiCoreSdk.getApi().getSocialLoginInfo()
```

The returned data is either `null` or of the following type

```typescript
export type SocialLoginInfo = {
  email: string | null
  name: string | null
  profileImage: string | null
  typeOfLogin: 'google' | 'discord'
} & Record<string, unknown>
```

### HideWidget

```typescript
import nufiCoreSdk from '@nufi/dapp-client-core'

nufiCoreSdk.getApi().hideWidget()
```

Use this method to close the Widget in case user logs out using your dapp.

### Show widget

When calling CIP-30 `enable` method the Widget
will be shown automatically.

Therefore if you detect (possibly a flag in your localStorage) that users is logged in
you can simply call the `enable` method to make the Widget visible.

### Use SsoButton for React

You can use the `@nufi/dapp-client-core` and `@nufi/dapp-client-cardano`
with any JS framework, though in case you are using React we prepared a simple
Social login button widget that you can use out of the box.

You can always use the SDK with you custom Button widget.

NPM

```
npm install @nufi/sso-button-react
```

Yarn

```
yarn add @nufi/sso-button-react
```

```jsx
import nufiCoreSdk from '@nufi/dapp-client-core'
import {initNufiDappCardanoSdk} from '@nufi/dapp-client-cardano'
import {SsoButton} from '@nufi/sso-button-react'
import '@nufi/sso-button-react/dist/style.css'

// Logged in example
<SsoButton
  state="logged_in"
  label={ssoUserInfo?.email || 'Connected'}
  userInfo={{
    provider: ssoUserInfo?.typeOfLogin
  }}
  isLoading={isDisconnecting}
  onLogout={() => {
    // custom logic
  }}
  classes={{
    base: styles.yourCustomClass
  }}
/>
```

```jsx
import nufiCoreSdk from '@nufi/dapp-client-core'
import {initNufiDappCardanoSdk} from '@nufi/dapp-client-cardano'
import {SsoButton} from '@nufi/sso-button-react'
import '@nufi/sso-button-react/dist/style.css'

// Logged out example
<SsoButton
  state="logged_out"
  label="Social login"
  isLoading={isConnecting}
  onLogin={() => {
    // custom logic
    initNufiDappCardanoSdk(nufiCoreSdk, 'sso');
    // custom logic
  }}
  classes={{
    base: styles.yourCustomClassName
  }}
/>
```

For complete example please check [here](https://github.com/nufi-official/adaplays.xyz/commit/641466c4e8b534f1461692cac6987396b77b5c7c).

### Selecting Extension provider

For users with NuFi extension installed, there are no specific actions required.
Simply access `window.cardano.nufi` from anywhere as it is not controlled by
the NuFi Widget SDK.

## Whitelist

### NuFiConnect mainnet

To integrate the widget on mainnet, your DApp's domain needs need to be whitelisted. Please [contact us](./contact.md) and specify the domains to be whitelisted.

Note that `localhost` with any port is supported by default.

### On-off ramp service
If you want a service user to be able to purchase crypto inside the widget using a fiat on-ramp (powered by Moonpay), your DApp's domain needs to be whitelisted. Please [contact us](./contact.md) and specify the domains to be whitelisted.

Once whitelisted you will need to use [this extension](https://chromewebstore.google.com/detail/always-disable-content-se/ffelghdomoehpceihalcnbmnodohkibj) for local testing, or ensure
that your dapp is locally accessible via `http://localhost` or `https://localhost` (i.e. no port number in the URL).

## Limitations
- The terms and conditions will be updated before going to production.
