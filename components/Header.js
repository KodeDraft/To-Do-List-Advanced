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
// ICONS
import { Ionicons } from "@expo/vector-icons";
// HEADER => INSTALLED
import { FlatHeader } from "react-native-flat-header";
// SAFE AREA VIEW
import { SafeAreaView } from "react-native-safe-area-context";
// ASYNC STORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header({ navigation, rightIconOnPress }) {
  //   FUNCTIONS

  //   GETTING THE THEME FROM ASYNC STORAGE FUNCTION
  const getTheme = async () => {
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
  //   TOGGLING THE SWITCH
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (theme == "light") {
      setTheme("dark");
      AsyncStorage.setItem("theme", "light");
    } else {
      setTheme("light");
      AsyncStorage.setItem("theme", "dark");
    }
  };

  // VARIABLES
  // THEME PROPERTIES
  const [theme, setTheme] = useState("light");
  const [headerBackground, setHeaderBackground] = useState("#000");
  const [headerContentColor, setHeaderContentColor] = useState();
  // SWITCH
  const [isEnabled, setIsEnabled] = useState(false);

  // GETTING THEME FROM ASYC STORAGE ALWAYS
  useEffect(() => {
    getTheme();
  }, [theme]);

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
