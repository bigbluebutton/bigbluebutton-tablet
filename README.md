# bigbluebutton-mobile

BigBlueButton mobile application.

## Development

### Linux

To build this application in linux, you need to run:

```sh
# Instal Android SDK
sudo apt install android-sdk

# In one terminal, start metro:
npx react-native start

# In other terminal, run the app:
npx react-native run-android
```

### MAC

To build this application in mac, you need to run:

```sh
# Install cocoapods gem
sudo gem install cocoapods

# Install dependencies
npx pod-install

# In one terminal, start metro:
npx react-native start

# In other terminal, run the app:
npx react-native run-ios

```

#### Open project in XCODE

To change native code, you can run this command:

```sh
open ios/BigBlueButton.xcodeproj
```
