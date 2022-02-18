import React, { useState, useEffect, createRef, useRef } from "react";
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
  Alert,
} from "react-native";
// FIREBASE
import { getAuth } from "firebase/auth";
// FIREBASE
import {
  collection,
  doc,
  deleteDoc,
  setDoc,
  addDoc,
  getFirestore,
  query,
  orderBy,
  onSnapshot,
  where,
  FieldValue,
} from "firebase/firestore";
// CONFIG
import firebaseConfig from "../config/firebaseConfig";
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
// AWESOME ALERT => INSTALLED

export default function Home() {
  useEffect(() => {
    showDate();
    showTime();
    getData();
  }, []);

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

  const resetForm = () => {
    setNewTaskTitle("");
    setNewTaskDesc("");
    setPriority("");
    setPriorityColor("");
  };
  const addData = async () => {
    const key = Date.now();
    const documentName = `tasks${key}`;

    await setDoc(doc(db, "tasks", documentName), {
      title: newTaskTitle,
      desc: newTaskDesc,
      priority: priority,
      priorityColor: priorityColor,
      date: fullDate,
      time: fullTime,
      key: key,
    }).catch((err) => {
      alert(err);
    });
  };
  const addTask = async () => {
    if (newTaskTitle.length < 1) {
      alert("Enter Task");
    } else if (newTaskDesc.length < 3) {
      alert("Task Description Should Be More than 3 Charecters");
    } else if (priority == null) {
      alert("Select Priority");
    } else {
      addData();
      closeAddToDo();
      resetForm();
      alert("Added Your Task");
    }
  };
  const getData = () => {
    // COLLECTION REFERENCE
    const colRef = collection(db, "tasks");
    // QUERING
    const q = query(colRef, orderBy("key", "desc"));

    // GETTING REALTIME DATA
    onSnapshot(q, (snapshot) => {
      let recievedTasks = [];
      snapshot.docs.forEach((doc) => {
        recievedTasks.push({
          ...doc.data(),
        });
      });
      setTasks(recievedTasks);
    });
  };

  // DELETING TASK
  const deleteTask = async (key) => {
    Alert.alert("Are u sure ?", "You want to delete this task", [
      {
        text: "No, Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes, Delete",
        onPress: () => {
          deleteDoc(doc(db, "tasks", `tasks${key}`)).catch((err) => {
            alert(err);
          });
          alert("Deleted Your Task");
        },
      },
    ]);
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
            style={{
              height: 70,
              backgroundColor: headerBackground,
              borderBottomWidth: 1,
              borderColor: theme == "dark" ? "#fff" : "#ccc",
            }}
          />
        </SafeAreaView>
      </>
    );
  }

  /* VARIABLES */
  /* VARIABLES */

  const actionSheetRef = createRef();

  // MAIN -> IMPORTANT
  const [tasks, setTasks] = useState([]);

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
  const [headerBackground, setHeaderBackground] = useState("");
  const [headerContentColor, setHeaderContentColor] = useState("");

  // SWITCH
  const [isEnabled, setIsEnabled] = useState(false);

  // FIREBASE
  const auth = getAuth(); //auth
  const user = auth.currentUser; //auth.currentuser
  const db = getFirestore(); //getFirestore()

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
      {!tasks.length < 1 ? (
        <>
          <View
            style={theme == "dark" ? darkMode.container : lightMode.container}
          >
            <View style={{ flex: 0, marginTop: 60, marginLeft: 20 }}>
              <Text style={theme == "dark" ? darkMode.title : lightMode.title}>
                Tasks
              </Text>
              <Text style={{ color: "dodgerblue" }}>
                Swipe Left The Task And Click The Trash Icon To Delete
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
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      backgroundColor: "black",
                      flexDirection: "row",
                      width: 60,
                      justifyContent: "space-between",
                      height: 40,
                      borderTopLeftRadius: 20,
                      borderBottomLeftRadius: 20,
                      borderColor: theme == "dark" ? "#ccc" : "#000",
                      borderWidth: 1,
                    }}
                    onPress={() => deleteTask(data.item.key)}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={19}
                      color="#ff3232"
                      style={{ paddingLeft: 13 }}
                    />
                  </TouchableOpacity>
                )}
                leftOpenValue={65}
                rightOpenValue={0}
              />
            </View>
          </View>
        </>
      ) : (
        <View
          style={theme == "dark" ? darkMode.container : lightMode.container}
        >
          <Text
            style={theme == "dark" ? darkMode.noTasksTxt : lightMode.noTasksTxt}
          >
            No Task ☹️.. Click The Add Button to Add Tasks
          </Text>
        </View>
      )}
      {/* THE SHEET THAT'S POP UP'S TO ADD TASK */}
      <ActionSheet ref={actionSheetRef}>
        <View style={theme == "dark" ? darkMode.form : lightMode.form}>
          <TextInput
            placeholder="Enter Task Title"
            placeholderTextColor={theme == "dark" ? "#ff7878" : "#005A9C"}
            style={theme == "dark" ? darkMode.formInput : lightMode.formInput}
            onChangeText={(title) => setNewTaskTitle(title)}
            value={newTaskTitle}
          />

          <TextInput
            placeholder="Enter Task Description"
            placeholderTextColor={theme == "dark" ? "#ff7878" : "#005A9C"}
            style={theme == "dark" ? darkMode.formInput : lightMode.formInput}
            onChangeText={(desc) => setNewTaskDesc(desc)}
            value={newTaskDesc}
          />

          <Text
            style={theme == "dark" ? darkMode.formLabel : lightMode.formLabel}
          >
            Current Date: {fullDate}
          </Text>

          <Text
            style={theme == "dark" ? darkMode.formLabel : lightMode.formLabel}
          >
            Current Time: {fullTime}
          </Text>

          <View style={{ paddingBottom: 10 }} />

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

          <TouchableOpacity
            style={
              theme == "dark" ? darkMode.customAddBtn : lightMode.customAddBtn
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
      </ActionSheet>
    </>
  );
}
