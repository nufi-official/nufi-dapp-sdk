# NuFi dapp SDK for Cardano

Note that SDK is still under heavy development and not yet considered
production ready or stable.

# Demo

You can try out the example dapp with the current version of SDK deployed [here](https://sdk-example-beb11c2a4292.herokuapp.com/).

You can also find "unpolished" example of SDK integration with the example cardano dapp [here](https://github.com/vacuumlabs/nufi-adaplays.xyz/pull/13).

## Install packages

The packages will not be public during the initial development phase
as we expect more rapid changes. In the near future, however, the packages should be available on npm.
During this period, you can install the packages as follows:

NPM

```
npm install @nufi/dapp-client-core@https://github.com/nufi-official/nufi-dapp-sdk/releases/download/v0.1.0/nufi-dapp-client-core-0.1.0.tgz
npm install @nufi/dapp-client-cardano@https://github.com/nufi-official/nufi-dapp-sdk/releases/download/v0.1.0/nufi-dapp-client-cardano-0.1.0.tgz
```

Yarn

```
yarn add @nufi/dapp-client-core@https://github.com/nufi-official/nufi-dapp-sdk/releases/download/v0.1.0/nufi-dapp-client-core-0.1.0.tgz
yarn add @nufi/dapp-client-cardano@https://github.com/nufi-official/nufi-dapp-sdk/releases/download/v0.1.0/nufi-dapp-client-cardano-0.1.0.tgz
```

## Usage

### Initialize core SDK

```typescript
import { initNufiDappSdk } from "@nufi/dapp-client-core";
const { hideWidget } = initNufiDappSdk();
```

Ideally call `initNufiDappSdk` during the first load.
This will get NuFi widget the chance to prefetch and later be initialized more quickly.
To hide the widget when users disconnect via dapp, you can call `hideWidget` method.
This is required for protocols like CIP-30 on Cardano, where no specific callback
handler for disconnect is defined by the specification.

To access `hideWidget` from anywhere, you can simply call `initNufiDappSdk`
again where needed or possibly store `hideWidget` in a React context or other
globally accessible variable based on your setup.

### Selecting SSO provider

```typescript
import { initNufiDappCardanoSdk } from "@nufi/dapp-client-cardano";

// Should be called before accessing `window.cardano.nufiSSO`
initNufiDappCardanoSdk("sso");
const api = await window.cardano.nufiSSO.enable();
```

When not supporting other NuFi widget providers like Metamask Snap, you can also
call `initNufiDappCardanoSdk('sso')` during initial app load, which will ensure
faster reaction time when calling `window.cardano.nufiSSO.enable()`.

Also note that `initNufiDappCardanoSdk('sso')` has to be called before
calling `window.cardano.nufiSSO.isEnabled()` or any other `window.cardano.nufiSSO` methods.

### Selecting Extension provider

For users with NuFi extension installed, there should be no specifics needs.
Simply access `window.cardano.nufi` from anywhere as it is not controlled by
the NuFi widget.

### Show widget

When calling CIP-30 `enable` method the Widget
will be shown automatically.

Therefore if you detect (possibly a flag in your localStorage) that users is logged in
and the CIP-30 `isEnabled` is returning `true`, you can simply call the `enable` method
to make the Widget visible.

## Limitations

- The SSO is currently using Google as the only provider. In the future there
  will possibility to choose provider within the widget or to provide it from dapp.
- Flashing when initially opening the widget.
- User is currently logged out after dapp refresh.
- New user will have to confirm terms and conditions in the future.
- Widget should not ask users that just logged in for permissions, but should
  grant them automatically.
- Signing will be moved into a separate signer window to prevent Clickjacking attacks.
- UI/UX will be adjusted in general.
- The `/widget` URL will become versioned once having the initial stable
  version of the SDK.
