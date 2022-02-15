import React, { useState, useEffect, createRef } from "react";
// NATIVE IMPORTS
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StatusBar,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
// FIREBASE
import { getAuth } from "firebase/auth";
// BOTTOM SHEET
import ActionSheet from "react-native-actions-sheet";
// CHECKBOX
import { CheckBox } from "react-native-elements";
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
// SWIPE LIST VIEW
import { SwipeListView } from "react-native-swipe-list-view";

export default function Home() {
  useEffect(() => {
    showDate();
    showTime();
  });
  // SCREEN WITH AND HEIGHT
  const { width } = Dimensions.get("window");
  const { height } = Dimensions.get("screen");

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

  // DATE USES
  // GET'S THE CURRENT DATE AND UPDATE EVERY SECOND
  const showDate = () => {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let dateFinal = `${date}/${month}/${year}`;

    setFullDate(dateFinal);
    setTimeout(showDate, 1000);
  };
  // GET'S THE CURRENT TIME AND UPDATES EVERY SECOND
  const showTime = () => {
    let date = new Date();
    let hour = date.getHours(); // 0 - 23
    let minutes = date.getMinutes(); // 0 -59
    let seconds = date.getSeconds(); // 0 -59
    let session = "AM";

    if (hour === 0) {
      hour = 12;
    }
    if (hour > 12) {
      hour = hour - 12;
      session = "PM";
    }
    hour = hour < 10 ? "0" + hour : hour;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let time = hour + ":" + minutes + ":" + seconds + " " + session;

    setFullTime(time);

    setTimeout(showTime, 1000);
  };

  // SETTING PROPRITY FUNCTIONS
  // SET HIGH PRIORITY
  const setHighPriority = () => {
    setHigh(!high);
    setMedium(false);
    setLow(false);
    setPriority("high");
    setPriorityColor("#FF0000");
  };
  // SET MEDIUM PRIORITY
  const setMediumPriority = () => {
    setHigh(false);
    setMedium(!medium);
    setLow(false);
    setPriority("medium");
    setPriorityColor("#fab802");
  };
  // SET LOW PRIORITY
  const setLowPriority = () => {
    setHigh(false);
    setMedium(false);
    setLow(!low);
    setPriority("low");
    setPriorityColor("#12a33b");
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

  // CLOSE ACTION SHEET
  const closeAddToDo = () => {
    actionSheetRef.current?.hide();
    setLow(false);
    setMedium(false);
    setHigh(false);
  };

  const addTask = () => {
    setTasks((prevTasks) => {
      return [
        {
          title: newTaskTitle,
          desc: newTaskDesc,
          priority: priority,
          priorityColor: priorityColor,
          key: Math.random() * 100,
        },
        ...prevTasks,
      ];
    });
  };
  // JSK COMPONENTS

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

  const actionSheetRef = createRef();

  // MAIN -> IMPORTANT
  const [tasks, setTasks] = useState([
    {
      title: "Task1",
      priority: "high",
      priorityColor: "red",
      key: 1,
    },
    {
      title: "Task2",
      priority: "medium",
      priorityColor: "orange",
      key: 2,
    },
    {
      title: "Task3",
      priority: "low",
      priorityColor: "dodgerblue",
      key: 3,
    },
    {
      title: "Task4",
      priority: "low",
      priorityColor: "red",
      key: 4,
    },
    {
      title: "Task5",
      priority: "low",
      priorityColor: "dodgerblue",
      key: 5,
    },
    {
      title: "Task6",
      priority: "low",
      priorityColor: "orange",
      key: 6,
    },
  ]);

  // FORM VARIABLES
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [fullDate, setFullDate] = useState();
  const [fullTime, setFullTime] = useState();

  // PRIORITY USES
  const [low, setLow] = useState(false);
  const [high, setHigh] = useState(false);
  const [medium, setMedium] = useState(false);
  const [priority, setPriority] = useState(null);
  const [priorityColor, setPriorityColor] = useState("");

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
      <Header
        rightIconOnPress={() => actionSheetRef.current?.setModalVisible()}
      />
      <View style={theme == "dark" ? darkMode.container : lightMode.container}>
        <View style={{ flex: 0, marginTop: 60, marginLeft: 20 }}>
          <Text style={theme == "dark" ? darkMode.title : lightMode.title}>
            Tasks
          </Text>
          <Text style={{ color: "dodgerblue" }}>
            Swipe Left To Delete And Finish Task
          </Text>
        </View>
        {/* RENDERING TASKS */}
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <SwipeListView
            data={tasks}
            renderItem={(data, rowMap) => (
              <View style={{ marginBottom: 10 }}>
                <View
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    borderTopRightRadius: 5,
                    borderBottomEndRadius: 5,
                    borderColor: theme == "dark" ? "#ccc" : "#000",
                    height: 40,
                    width: width - 30,
                    backgroundColor: theme == "dark" ? "#ccc" : "#000",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: data.item.priorityColor,
                      height: 20,
                      width: 20,
                      borderRadius: 3,
                      marginRight: 10,
                    }}
                  />
                  <Text
                    style={{
                      color: theme == "dark" ? "#000" : "#34ebd5",
                      fontWeight: "bold",
                    }}
                  >
                    {data.item.title}
                  </Text>
                </View>
              </View>
            )}
            renderHiddenItem={(data, rowMap) => (
              <View
                style={{
                  padding: 10,
                  backgroundColor: "black",
                  flexDirection: "row",
                  width: 100,
                  justifyContent: "space-between",
                  height: 40,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                  borderColor: theme == "dark" ? "#ccc" : "#000",
                  borderWidth: 1,
                }}
              >
                <TouchableOpacity
                  onPress={() => alert("Deleting Task On Process")}
                  style={{
                    borderRightWidth: 1,
                    borderColor: "#fff",
                    paddingRight: 20,
                  }}
                >
                  <Ionicons name="trash-outline" size={18} color="#ff3232" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => alert("Finishing task is on process")}
                >
                  <Ionicons
                    name="checkmark-done-outline"
                    size={20}
                    color="#00ff00"
                  />
                </TouchableOpacity>
              </View>
            )}
            leftOpenValue={105}
            rightOpenValue={0}
          />
        </View>
      </View>

      {/* THE SHEET THAT'S POP UP'S TO ADD TASK */}
      <ActionSheet ref={actionSheetRef}>
        <ScrollView>
          <View
            style={{
              height: "40%",
              backgroundColor: theme == "dark" ? "#000" : "#fff",
            }}
          >
            {/* ADD TASK SECTION TITLE */}
            <Text
              style={
                theme == "dark" ? darkMode.addToDoTitle : lightMode.addToDoTitle
              }
            >
              Add Task
            </Text>

            <View style={theme == "dark" ? darkMode.form : lightMode.form}>
              {/* ADD TASK FORM */}
              {/* TASK TITLE INPUT */}
              <TextInput
                placeholder="Enter Task Title"
                placeholderTextColor="#005A9C"
                style={
                  theme == "dark" ? darkMode.formInput : lightMode.formInput
                }
                onChangeText={(title) => setNewTaskTitle(title)}
                value={newTaskTitle}
              />
              {/* TASK DESC INPUT */}
              <TextInput
                placeholder="Enter Task Description"
                placeholderTextColor="#005A9C"
                style={
                  theme == "dark" ? darkMode.formInput : lightMode.formInput
                }
                onChangeText={(desc) => setNewTaskDesc(desc)}
                value={newTaskDesc}
              />
              {/* TASK ENTERED DATE */}
              <Text
                style={
                  theme == "dark" ? darkMode.formLabel : lightMode.formLabel
                }
              >
                Current Date: {fullDate}
              </Text>
              {/* TASK ENTERED TIME */}
              <Text
                style={
                  theme == "dark" ? darkMode.formLabel : lightMode.formLabel
                }
              >
                Current Time: {fullTime}
              </Text>

              <Text style={{ paddingBottom: 10 }}></Text>
              {/* SETTING PRIORITY */}
              {/* <Text
                style={{
                  color: priorityColor,
                  paddingBottom: 20,
                  fontSize: 20,
                }}
              >
                SELECT PRIORITY:
              </Text> */}
              <CheckBox
                title="High"
                checked={high}
                checkedColor="#FF0000"
                onPress={setHighPriority}
              />
              <CheckBox
                title="Medium"
                checked={medium}
                checkedColor="#fab802"
                onPress={setMediumPriority}
              />
              <CheckBox
                title="Low"
                checked={low}
                checkedColor="#12a33b"
                onPress={setLowPriority}
              />

              {/* ADDING TASK BUTTON */}
              <TouchableOpacity
                style={
                  theme == "dark"
                    ? darkMode.customAddBtn
                    : lightMode.customAddBtn
                }
                onPress={addTask}
              >
                <Text
                  style={
                    theme == "dark"
                      ? darkMode.customAddBtnText
                      : lightMode.customAddBtnText
                  }
                >
                  ADD
                </Text>
              </TouchableOpacity>

              {/* CLOSING ACTION SHEET BUTTON */}
              <TouchableOpacity
                style={
                  theme == "dark"
                    ? darkMode.customCloseBtn
                    : lightMode.customCloseBtn
                }
                onPress={closeAddToDo}
              >
                <Text
                  style={
                    theme == "dark"
                      ? darkMode.customCloseBtnText
                      : lightMode.customCloseBtnText
                  }
                >
                  CLOSE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ActionSheet>
    </>
  );
}
