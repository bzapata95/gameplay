import React from "react";
import { StatusBar, LogBox } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import {
  Rajdhani_700Bold,
  Rajdhani_500Medium,
} from "@expo-google-fonts/rajdhani";

import Background from "./src/components/Background";

import { Routes } from "./src/routes";
import Providers from "./src/hooks";

LogBox.ignoreLogs([
  "You are not currently signed in to Expo on your development machine",
]);

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_700Bold,
    Rajdhani_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Providers>
        <Routes />
      </Providers>
    </Background>
  );
}
