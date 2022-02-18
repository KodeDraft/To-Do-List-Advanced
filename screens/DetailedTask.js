import React, { useEffect, useState } from "react";
// NATIVE IMPORTS
import { Text, View, StyleSheet } from "react-native";
// SAFE AREA VIEW
import { SafeAreaView } from "react-native-safe-area-context";
// ICONS
import { Ionicons } from "@expo/vector-icons";
// STYLES
import darkMode from "../styles/darkMode";
import lightMode from "../styles/lightMode";
// ASYNC STORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DetailedTask(props) {
  useEffect(() => {
    getTheme();
  }, [theme]);

  const getTheme = async () => {
    try {
      const value = await AsyncStorage.getItem("theme");
      if (value !== null) {
        // We have data!!
        setTheme(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  const item = props.route.params;

  const [theme, setTheme] = useState();

  return (
    <>
      <View style={theme == "dark" ? darkMode.container : lightMode.container}>
        <SafeAreaView>
          <View style={theme == "dark" ? darkMode.header : lightMode.header}>
            <Ionicons
              name="arrow-back-circle-outline"
              size={34}
              style={{ paddingLeft: 20, paddingTop: 8 }}
              color={item.priorityColor}
              onPress={() => props.navigation.goBack()}
            />
          </View>
        </SafeAreaView>

        <View
          style={
            theme == "dark" ? darkMode.taskContainer : lightMode.taskContainer
          }
        >
          <Text
            style={{
              ...(theme == "dark" ? darkMode.taskTitle : lightMode.taskTitle),
              color: item.priorityColor,
            }}
          >
            {item.title}
          </Text>
          <Text style={theme == "dark" ? darkMode.label : lightMode.label}>
            Task Description:{" "}
            <Text
              style={{
                color: item.priorityColor,
              }}
            >
              {item.desc}
            </Text>
          </Text>
          <Text style={theme == "dark" ? darkMode.label : lightMode.label}>
            Task Priority:{" "}
            <Text
              style={{
                color: item.priorityColor,
              }}
            >
              {item.priority}
            </Text>
          </Text>
          <Text style={theme == "dark" ? darkMode.label : lightMode.label}>
            Task Created Date:{" "}
            <Text
              style={{
                color: item.priorityColor,
              }}
            >
              {item.date}
            </Text>
          </Text>
          <Text style={theme == "dark" ? darkMode.label : lightMode.label}>
            Task Created Time:{" "}
            <Text style={{ color: item.priorityColor }}>{item.time}</Text>
          </Text>
        </View>
      </View>
    </>
  );
}

const detailedTaskStyles = StyleSheet.create({});
