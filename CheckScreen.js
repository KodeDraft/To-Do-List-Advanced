import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch, Appearance } from "react-native";
import darkMode from "./styles/darkMode";
import lightMode from "./styles/lightMode";
import SwitchButton from "switch-button-react-native";

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
      <SwitchButton
        text1="DAY" // optional: first text in switch button --- default ON
        text2="NIGHT" // optional: second text in switch button --- default OFF
        onValueChange={toggleSwitch} // this is necessary for this component
        switchWidth={200} // optional: switch width --- default 44
        switchHeight={44} // optional: switch height --- default 100
        switchdirection="rtl" // optional: switch button direction ( ltr and rtl ) --- default ltr
        switchBorderRadius={100} // optional: switch border radius --- default oval
        switchSpeedChange={500} // optional: button change speed --- default 100
        switchBorderColor="#d4d4d4" // optional: switch border color --- default #d4d4d4
        switchBackgroundColor="#fff" // optional: switch background color --- default #fff
        btnBorderColor="#00a4b9" // optional: button border color --- default #00a4b9
        btnBackgroundColor="#00bcd4" // optional: button background color --- default #00bcd4
        fontColor="#b1b1b1" // optional: text font color --- default #b1b1b1
        activeFontColor="#fff" // optional: active font color --- default #fff
      />
    </View>
  );
}
