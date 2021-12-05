# Awetributions

[![](https://img.shields.io/github/license/shensven/Awetributions)](./LICENSE)
[![](https://img.shields.io/github/package-json/dependency-version/shensven/Awetributions/react)](./package.json)
[![](https://img.shields.io/github/package-json/dependency-version/shensven/Awetributions/react-native)](./package.json)
[![Test](https://github.com/shensven/Awetributions/actions/workflows/dev.yml/badge.svg?branch=dev)](https://github.com/shensven/Awetributions/actions/workflows/dev.yml)
[![Build](https://github.com/shensven/Awetributions/actions/workflows/main.yml/badge.svg)](https://github.com/shensven/Awetributions/actions/workflows/main.yml)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/38ba286740994a94ad75d9fcf3b2310b)](https://app.codacy.com/gh/shensven/Awetributions?utm_source=github.com&utm_medium=referral&utm_content=shensven/Awetributions&utm_campaign=Badge_Grade_Settings)

## FEATURES

-   Multiple Languages
-   Dark mode
-   Debounce & Throttle
-   High Concurrency

## BUILD

### PREREQUISITES

-   [Node 12](https://nodejs.org) or higher, [nvm](https://github.com/nvm-sh/nvm) is recommended for installation
-   The [yarn](https://yarnpkg.com/getting-started/install) package manager
-   [Watchman](https://formulae.brew.sh/formula/watchman)
-   [Xcode 10](https://developer.apple.com/xcode/resources) or higher
-   [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)
-   [JDK 8](https://formulae.brew.sh/formula/openjdk@8) or higher, [JDK 11](https://formulae.brew.sh/formula/openjdk@11) recommended
-   [Android SDK Platform 30](https://developer.android.com/studio/releases/platforms), recommended for installation via [android studio](https://developer.android.com/studio)
-   [Android SDK Build-Tools 30.0.2](https://developer.android.com/studio/releases/build-tools), recommended for installation via [android studio](https://developer.android.com/studio)

### GET STARTED

```sh
yarn install
```

```sh
cd ios && pod install
```

### RUNNING ON SIMULATOR

```sh
yarn react-native run-ios
```

```sh
yarn react-native run-android
```

### RUNNING ON DEVICE

```sh
yarn react-native run-ios --device
```

```sh
yarn react-native run-android
```

### TEST

```sh
yarn test
```

```sh
cd android && chmod +x gradlew && ./gradlew test
```

### ASSEMBLE THE APK

```sh
cd android && ./gradlew assembleRelease
```

## LICENSE

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fshensven%2FAwetributions.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fshensven%2FAwetributions?ref=badge_large)
