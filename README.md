# vue-random-that

## Summary
This project was an attempt to showcase a simple proof of concept for a ionic mobile app using Vue as the renderer. Where there would be a tab navigation system with each tab having it's own navigation history. A local database to facilitate offline first functionality and act as a part of the global state for the app, which could be used reactively. Other minor things include FAB menus, Page template, sliding item actions, etc...

This was also a part of an effort on my part to learn Vue and apply it to something.

## Use/Install
App is currently available at the following locations
- **Web** - Open link and enjoy : https://vue-random-that.web.app/
- **Android APK** - Download file and enjoy the install : https://drive.google.com/file/d/1WT_MPCk0vJEhh5aidNHoqpwJu2nPqOC1/view?usp=sharing
- **iOS Simulator App** - See **NOTE** below : https://drive.google.com/file/d/1Ei1lUF-slWZ82JyfDx4qcyZFKs10A31Y/view?usp=sharing

**NOTE** the following for **iOS Simulator.app folder**:
- Unzip the zip folder containing the `veu-random-that.app` folder.
- 🚨 If the build is not installable on your simulator because of "... is damaged and can't be opened.", please run:
`xattr -rd com.apple.quarantine /path/to/your.app`
- Then to install in a simulator run `xcrun simctl install booted /path/to/vue-random-that.app`

## Features

### Tabs
Using `ion-tabs`, we have bottom tab navigation. This would be akin to have a Tab Navigator or Tab Router.

![ion-tabs.png](https://i.postimg.cc/nLVw9Xc6/ion-tabs.png)

### Stack Navigation
The idea behind using `ion-nav` for the tabs **About** and **Lists** is that we could go deeper in either stack(1 level in this POC), but their histories would remain separate. So going back in one doesn't result in going back in the other. And we could switch between them since they are tabs. `ion-nav` is basically the equivalent of a Stack Navigator or Stack Router.

About Tab Root | About Details | Lists Tab Root | Movies List  
-------------- | --------------| -------------- | -----------
<img src="https://i.postimg.cc/DZ8j5RG6/about-page.png" width="150" height="300" /> | <img src="https://i.postimg.cc/FHVBKymy/about-limelyte-page.png" width="150" height="300" /> | <img src="https://i.postimg.cc/Kzw9WQr2/lists-page.png" width="150" height="300" /> | <img src="https://i.postimg.cc/wMNWYJ0s/movies-page.png" width="150" height="300" />

For this to work, I had to register all the tab components as Custom Elements! So I used `vue-custom-elements` to achieve that.

### Random Tabs
**Home** tab is from the `vue-cli` scaffolding. And the **Database** tab contains example code ported from [WatermelonDB](https://github.com/Nozbe/WatermelonDB/tree/master/examples/web/src) in order to briefly test that `WatermelonDB` is working in the project.

### Reactivity using withObservables HOC(higher order component) and WatermelonDB
`WatermelonDB` is a client side database that I have wanted to try using. It's meant to be used on React Native or the Web. But the helper package `withObservables` was meant to be used in React projects. So I made my own Vue version of `withObservables`, which was not recommended by Evan Yu. He wasn't exactly thrilled by my example of an HOC component when there's a Composition API 😅 : https://github.com/vuejs/vue-next/issues/1671 . I will most likely end up transitioning to using the Composition API instead. The `Forwarding.js` and `withObservables.js` decoractor functions were simply my attempt at porting `withObservables` from React HOC to a Vue HOC.

In any case for the **Lists** and **List Items** pages, we can add, edit, or delete elements from the list simply by modifying the local db while our component is hooked up to Observables for specific queries. See `src/tabs/Lists/index.js` and `src/pages/List/index.js` for examples of this.

### Random That
So the main feature of the app is comprised of the **Lists** and **List Items** tabs. Random That is basically a spin off of Todo List. You can use it just like Todo List. But if you wanted a randomized selection for what to do next, you can access the "Random" FAB action on **List Items**. In addition, once you have done all the items and you press the "Random" FAB action, it will pick a new random selection and reset the rest of items to not done. In this way people people could randomly select one of their next favorite things to do. And once they have done all of them, they could start it all over again!

"Random" Action | Random Selection
--------------- | ----------------
<img src="https://i.postimg.cc/fbHqcMVk/items-fab-menu.png />" /> | <img src="https://i.postimg.cc/jqn3f0td/random-that-item.png" width="150" height="300" />

## What's Next
Well I was trying to clean the project up the attempt to refactor the folder structure and some aspects of the app on the `refactor` branch. But it broke some functionality. So I had to leave it there for now until I can address the issues there on that branch before merging into `master`.

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

### Capacitor
```
# create build of web app to drop into capacitor
npm run build 
# copy web app build to capacitor platforms that have already been added to the project
npx cap copy
# run this command to open project in Android Studio to run or build the apk/aab from there
npx cap open android
# run this command to open the project in Xcode to run or archive the ipa from there
npx cap open ios
```
