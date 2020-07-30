# vue-random-that

## Summary
This project was an attempt to showcase a simple proof of concept for a ionic mobile app using Vue as the renderer. Where there would be a tab navigation system with each tab having it's own navigation history. A local database to facilitate offline first functionality and act as a part of the global state for the app, which could be used reactively. Other minor things include FAB menus, Page template, sliding item actions, etc...

App currently is at the following locations
- **Web** - Open link and enjoy : https://vue-random-that.web.app/
- **Android APK** - Download file and install : https://drive.google.com/file/d/1WT_MPCk0vJEhh5aidNHoqpwJu2nPqOC1/view?usp=sharing
- **iOS Simulator App** - See **NOTE** below : https://drive.google.com/file/d/1Ei1lUF-slWZ82JyfDx4qcyZFKs10A31Y/view?usp=sharing

**NOTE** the following for **iOS Simulator IPA**:
- 🚨 If the build is not installable on your simulator because of "... is damaged and can't be opened.", please run:
`xattr -rd com.apple.quarantine /path/to/your.app`
- Then to install in a simulator run `xcrun simctl install booted /path/to/vue-random-that.app`

There was an attempt to refactor the folder structure and some aspects of the app on the `refactor` branch, but it broke some functionality. So I had to leave it there for now until I can address the issues there.

## Features


### Tabs


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
