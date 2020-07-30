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
Using `ion-tabs`, we have bottom tab navigation. This would be akin to have a Tab Navigator or Tab Router.

![ion-tabs.png](https://i.postimg.cc/nLVw9Xc6/ion-tabs.png)

### Stack Navigation
The idea behind using `ion-nav` for the tabs **About** and **Lists** is that we could go deeper in either stack(1 level in this POC), but their histories would remain separate. So going back in one doesn't result in going back in the other. And we could switch between them since they are tabs. `ion-nav` is basically the equivalent of a Stack Navigator or Stack Router.

About Tab Root | About Details | Lists Tab Root | Movies List  
-------------- | --------------| -------------- | -----------
<img src="https://i.postimg.cc/DZ8j5RG6/about-page.png" width="150" height="300" /> | <img src="https://i.postimg.cc/FHVBKymy/about-limelyte-page.png" width="150" height="300" /> | <img src="https://i.postimg.cc/Kzw9WQr2/lists-page.png" width="150" height="300" /> | <img src="https://i.postimg.cc/wMNWYJ0s/movies-page.png" width="150" height="300" />

### Random Tabs
**Home** tab is from the `vue-cli` scaffolding. And the **Database** tab contains example code ported from [WatermelonDB](https://github.com/Nozbe/WatermelonDB/tree/master/examples/web/src).

### Reactivity using withObservables HOC(higher order component)
WatermelonDB was a client side database that I have wanted to try using. It's meant to be used with React Native or the Web. But the helper package `withObservables` was meant to be used in React projects. So I made my own Vue version of `withObservables`, which was not recommended by Evan you 

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
