import React, { useState, useEffect } from "react";
// NATIVE IMPORTS
import { Text, View } from "react-native";
// SCREENS
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import DetailedTask from "./screens/DetailedTask";

// NAVIGATION IMPORTS
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// CONFIG => FIREBASE CONFIG
import firebaseConfig from "./config/firebaseConfig";

// STACKS
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="SignIn"
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DetailedTask" component={DetailedTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

