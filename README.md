# Welcome to the SDSU Maps Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Things to Note

This project does not have perfect ioS compatibility. 
We were able to use the ioS app Expo Go as a "sandbox" for checking how the app would appear on ioS by running command line interfaces
This is why we can only run the app with: 

```bash
npx expo start
```

The website format consists of a navbar, a map, a left marker, a center marker, and a bottom bar to round things out.

The website relies heavily on React's interactivity to make things work flexibly, such as ScrollView and Modal to help with visibility

View tags are used to wrap when formatting is needed for certain styling.






