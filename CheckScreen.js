import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch, Appearance } from "react-native";
import darkMode from "./styles/darkStyles";
import lightMode from "./styles/lightStyles";

export default function CheckScreen() {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (theme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  Appearance.addChangeListener((scheme) => {
    setTheme(scheme.colorScheme);
  });

  return (
    <View style={theme == "light" ? lightMode.container : darkMode.container}>
      <Text style={theme == "light" ? lightMode.txt : darkMode.txt}>
        CheckScreen
      </Text>
      <Switch
        trackColor={{ true: "#767577", false: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}
