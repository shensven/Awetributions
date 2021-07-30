# Awetributions

[![](https://img.shields.io/github/license/shensven/Awetributions)](./LICENSE)
[![](https://img.shields.io/github/package-json/v/shensven/Awetributions?color=2DBB60)](./package.json)
[![](https://img.shields.io/github/package-json/dependency-version/shensven/Awetributions/react)](./package.json)
[![](https://img.shields.io/github/package-json/dependency-version/shensven/Awetributions/react-native)](./package.json)
[![Test](https://github.com/shensven/Awetributions/actions/workflows/dev.yml/badge.svg?branch=dev)](https://github.com/shensven/Awetributions/actions/workflows/dev.yml)

## PREREQUISITES

-   Node 12 or newer
-   Watchman
-   JDK 8 or newer
-   Android minSDK 21
-   Xcode
-   CocoaPods

## Run instructions for Android:

Have an Android emulator running (quickest way to get started), or a device connected.

```bash
yarn android
```

## Run instructions for iOS:

```
yarn ios
```

## Build for Android

```
cd android && ./gradlew assembleRelease
```
