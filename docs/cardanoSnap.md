# Metamask snap (Cardano wallet)

# Demo

Example dapp with the current version of SDK is deployed [here](https://sdk-example.nu.fi).

Snippets of example integration can be found [here](https://github.com/nufi-official/adaplays.xyz/commit/641466c4e8b534f1461692cac6987396b77b5c7c).
Note that the versions in `package.json` need to be updated to the latest available.

## Install custom Metamask Flask
*Note that the custom Metamask Flask
has to be used due to changes in the Metamask extension itself, that were not yet published to production*.

Download Metamask Flask extension from [here](https://github.com/nufi-official/metamask-extension/releases/tag/v11.10.0-flask-cip3) or click [here](https://github.com/nufi-official/metamask-extension/releases/download/v11.10.0-flask-cip3/v11.10.0-flask-cip3.zip) to download it directly.

Once downloaded:
* Extract the attached zip file
* Use separate Chrome profile to not mess with the production Metamask extension
* Navigate to `chrome://extensions/`
* Press "Load unpacked"
* Choose the "chrome" folder of the extracted zip file
* Alternatively use "firefox" folder if using Firefox

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

### Check whether user has Metamask installed
```typescript
import nufiCoreSdk from '@nufi/dapp-client-core'

nufiCoreSdk.getApi().isMetamaskInstalled().then((isMetamaskInstalled) => {
  // `isMetamaskInstalled` is `true` if user has Metamask installed
  // You can e.g. set your local state to reflect that and display
  // login with metamask option.
})
```

### Initialize Snap login for Cardano

```typescript
import nufiCoreSdk from '@nufi/dapp-client-core'
import {initNufiDappCardanoSdk} from '@nufi/dapp-client-cardano'

// Should be called before accessing `window.cardano.nufiSnap`
initNufiDappCardanoSdk(nufiCoreSdk, 'snap')
const api = await window.cardano.nufiSnap.enable()
```

The `initNufiDappCardanoSdk` will populate `window.cardano.nufiSnap` object
which has methods corresponding to CIP-30 standard.

See [multiple providers docs](./multipleProviders.md)
to use `initNufiDappCardanoSdk` correctly, when supporting multiple providers.

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

### Selecting Extension provider

For users with NuFi extension installed, there are no specific actions required.
Simply access `window.cardano.nufi` from anywhere as it is not controlled by
the NuFi Widget SDK.

## Limitations
- The terms and conditions will be updated before going to production.
