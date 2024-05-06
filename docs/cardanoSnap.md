# Metamask snap (Cardano wallet)

# Demo

Example dapp with the current version of SDK is deployed [here](https://sdk-example.nu.fi).

Snippets of example integration can be found [here](https://github.com/nufi-official/adaplays.xyz/commit/641466c4e8b534f1461692cac6987396b77b5c7c).
Note that the versions in `package.json` need to be updated to the latest available.

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

// mainnet network (runs against staging version of NuFi)
nufiCoreSdk.init('https://wallet-staging.nu.fi')
```

The `init` function has to be called before calling other functions from
`@nufi/dapp-client-core` or `@nufi/dapp-client-cardano` SDK.

Its advisable to call it as soon as possible as it will also prefetch the Widget,
and will make it appear faster when being requested later on.

If no origin is passed to `init` it defaults to `https://wallet.nu.fi`. Note that this default will
not work as mainnet is not yet supported.

For now please use the origin from the above example. Note that it will use `preprod` network.

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
- Only cardano preprod network is enabled for now.
- The terms and conditions will be updated before going to production.

## Troubleshooting
