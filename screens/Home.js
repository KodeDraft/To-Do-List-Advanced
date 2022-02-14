import React, { useState, useEffect } from "react";
// NATIVE IMPORTS
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  StatusBar,
} from "react-native";
// FIREBASE
import { getAuth } from "firebase/auth";

// ICONS
import { Ionicons } from "@expo/vector-icons";
// STYLES
import darkMode from "../styles/darkMode";
import lightMode from "../styles/lightMode";
// STORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";
// HEADER => INSTALLED
import { FlatHeader } from "react-native-flat-header";
// SAFE AREA VIEW
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  // FUNCTIONS
  const getTheme = async () => {
    try {
      const value = await AsyncStorage.getItem("theme");
      if (value !== null) {
        setTheme(value);
      }
    } catch (error) {
      // Error retrieving data
      console.log("Error Retriving From Asyn Storage", error);
    }
  };

  /* HEADER FUNCTIONS */
  /* HEADER FUNCTIONS */

  const getHeaderTheme = async () => {
    try {
      const value = await AsyncStorage.getItem("theme");
      if (value !== null) {
        setHeaderBackground(value == "dark" ? "#000" : "#fff");
        setHeaderContentColor(value == "dark" ? "#fff" : "#000");
        if (value == "dark") {
          setIsEnabled(true);
        } else {
          setIsEnabled(false);
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  // TOGGLING THE SWITCH
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (theme == "light") {
      setTheme("dark");
      AsyncStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      AsyncStorage.setItem("theme", "light");
    }
  };

  /* MAIN HEADER COMPONENT */
  /* MAIN HEADER COMPONENT */

  function Header({ navigation, rightIconOnPress }) {
    //   JSK
    return (
      <>
        <StatusBar backgroundColor="#009387" barStyle="light-content" />
        <SafeAreaView>
          <FlatHeader
            leftText={
              <TouchableOpacity onPress={(event) => {}}>
                <Ionicons
                  name="log-out-outline"
                  size={34}
                  color={headerContentColor}
                />
              </TouchableOpacity>
            }
            leftTextStyle={{ color: headerContentColor }}
            rightIcon={
              <TouchableOpacity onPress={rightIconOnPress}>
                <Ionicons
                  name="add-circle"
                  color={headerContentColor}
                  size={35}
                />
              </TouchableOpacity>
            }
            centerContent={
              <Switch
                thumbColor={isEnabled ? "#000" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            }
            large
            style={{ height: 70, backgroundColor: headerBackground }}
          />
        </SafeAreaView>
      </>
    );
  }

  /* VARIABLES */
  /* VARIABLES */

  // HEADER VARIABLES
  // THEME PROPERTIES
  const [headerBackground, setHeaderBackground] = useState("#000");
  const [headerContentColor, setHeaderContentColor] = useState("#fff");

  // SWITCH
  const [isEnabled, setIsEnabled] = useState(false);

  // FIREBASE AUTH
  const auth = getAuth();
  const user = auth.currentUser;

  // THEME PROPERTIES
  const [theme, setTheme] = useState();

  // USE EFFECTS
  useEffect(() => {
    getTheme();
    getHeaderTheme();
  }, [theme]);

  // JSK
  return (
    <>
      <Header rightIconOnPress={(ev) => console.log(ev)} />
      <View style={theme == "dark" ? darkMode.container : lightMode.container}>
        <Text style={theme == "dark" ? darkMode.txt : lightMode.txt}>
          Home Screen
        </Text>
      </View>
    </>
  );
}
