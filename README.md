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

#### Simulator

To build this application in mac, you need to run:

```sh
# Install cocoapods gem
sudo gem install cocoapods

# Install dependencies
npx pod-install

# In one terminal, start metro:
npx react-native start

# In other terminal, run the app:
npx react-native run-ios --simulator="iPhone 13"

```

#### Real device

To run this application in a real ios device, you need to run:

```sh
#Install package
npm install -g ios-deploy

#Run
npx react-native run-ios --device "iPhone de TDJ"
```

#### Open project in XCODE

To change native code, you can run this command:

```sh
open ios/BigBlueButton.xcodeproj
```
