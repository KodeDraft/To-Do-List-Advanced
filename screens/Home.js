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
import Header from "../components/Header";
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
  // VARIABLES

  // THEME PROPERTIES
  // const [theme, setTheme] = useState("light");
  const [headerBackground, setHeaderBackground] = useState("#000");
  const [headerContentColor, setHeaderContentColor] = useState();
  // SWITCH
  const [isEnabled, setIsEnabled] = useState(false);

  // FIREBASE AUTH
  const auth = getAuth();
  const user = auth.currentUser;

  // THEME PROPERTIES
  const [theme, setTheme] = useState();

  // JSK FUNCTION => HEADER
  function Header({ navigation, rightIconOnPress }) {
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

    // GETTING THEME FROM ASYC STORAGE ALWAYS
    // useEffect(() => {
    //   getTheme();
    // }, [theme]);

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

  useEffect(async () => {
    try {
      const value = await AsyncStorage.getItem("theme");
      if (value !== null) {
        // setTheme(value);
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
      // setTheme("light");
    }
  }, [theme]);

  // FUNCTIONS

  // VARIABLES

  // JSK
  return (
    <>
      <Header rightIconOnPress={(ev) => console.log(ev)} />
      <View style={theme == "dark" ? darkMode.container : lightMode.container}>
        <Text>Hello</Text>
      </View>
    </>
  );
}

const headerStyles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "black",
    height: "13%",
    width: "100%",
  },
  sameRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "12%",
  },
  headerTitle: {
    color: "white",
    fontSize: 40,
  },
  btn: {
    backgroundColor: "red",
    width: 50,
    paddingRight: 20,
  },
});
