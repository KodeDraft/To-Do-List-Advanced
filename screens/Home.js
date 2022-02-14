import React from "react";
// NATIVE IMPORTS
import { View, Text } from "react-native";
// FIREBASE CONFIG
// import firebaseConfig from "../config/firebaseConfig";
import { getAuth } from "firebase/auth";

export default function Home() {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log("====================================");
  console.log("Current User: ", user);
  console.log("====================================");
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}
