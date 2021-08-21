# Awetributions

[![](https://img.shields.io/github/license/shensven/Awetributions)](./LICENSE)
[![](https://img.shields.io/github/package-json/v/shensven/Awetributions?color=2DBB60)](./package.json)
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

## PREREQUISITES

-   Node 12 or newer
-   Watchman
-   JDK 8 or newer
-   Android minSDK 21
-   Xcode
-   CocoaPods

## BUILD

### Run instructions for Android

Have an Android emulator running (quickest way to get started), or a device connected.

```sh
yarn android
```

### Run instructions for iOS

```sh
yarn ios
```

### Build for Android

```sh
cd android && ./gradlew assembleRelease
```
