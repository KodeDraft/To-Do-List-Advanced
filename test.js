// IMPORTS - - !important
import React, { useState, createRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  Button,
  Animated,
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import Header from "../shared/Header";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import { db } from "../firebase";
import { CheckBox } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

export default function ToDo({ navigation }) {
  // ALWAYS GETTING DATA - - !important
  useEffect(() => {
    // CALLING THE "getData" FUNCTION TO GET DATA FROM FIREBASE
    getData();
    // CALLING "showTime" FUNCTION
    showTime();
    // CALLING "showDate" FUNCTION
    showDate();
  }, [""]);
  // VARIABLES

  // PRIORITY USES
  const [low, setLow] = useState(false);
  const [high, setHigh] = useState(false);
  const [medium, setMedium] = useState(false);
  const [priority, setPriority] = useState(null);
  const [priorityColor, setPriorityColor] = useState("");

  // EACH DATA FROM FIREBASE FIRESTORE - - !important
  const [titleFromFirebase, setTitleFromFirebase] = useState("");
  const [descFromFirebase, setDescFromFirebase] = useState("");
  const [dateFromFirebase, setDateFromFirebase] = useState("");
  const [timeFromFirebase, setTimeFromFirebase] = useState("");
  const [priorityFromFirebase, setPriorityFromFirebase] = useState("");
  const [firebasePriorityColor, setFirebasePriorityColor] = useState("");

  // TASKS TO BE DONE
  const [tasks, setTasks] = useState([false]);

  // VALIDATION TEXTS
  const noTitle = "title should contain more than 2 letters";
  const noDesc = "description should contain more than 2 letters";
  const noPriority = "Select Task Priority";

  // "newTaskTitle" VARIABLE STORES THE TASK TITLE
  const [newTaskTitle, setNewTaskTitle] = useState("");
  // "newTaskDesc" VARIABLE STORES THE TASK DESC
  const [newTaskDesc, setNewTaskDesc] = useState("");

  // GET TIME FROM "showTime" FUNCTION
  const [fullTime, setFullTime] = useState("");
  // GET DATE FROM "showDate" FUNCTION
  const [fullDate, setFullDate] = useState("");
  // ACTION SHEET REFERENCE
  const actionSheetRef = createRef();

  // FUNCTIONS - - !important

  // FIREBASE FIRESTORE HANDLING
  // FIREBASE FIRESTORE HANDLING

  // GETTING DATA FROM FIREBASE FIRESTORE
  const getData = async () => {
    const taskCol = collection(db, "tasks");
    const taskSnapshot = await getDocs(taskCol);
    const taskList = taskSnapshot.docs.map((doc) => doc.data());

    setTitleFromFirebase(taskList.title);
    setDescFromFirebase(taskList.desc);
    setDateFromFirebase(taskList.date);
    setTimeFromFirebase(taskList.time);
    setFirebasePriorityColor(taskList.priorityColor);
    setTasks(taskList);
  };
  // SETTING DATA TO FIREBASE FIRESTORE
  const setData = async () => {
    const randomId = (Math.random() + 1).toString(36).substring(5);
    const randomKey = Math.random().toString();

    //validation
    if (newTaskTitle.length < 2) {
      alert(noTitle);
    } else if (newTaskDesc.length < 2) {
      alert(noDesc);
    } else if (priority === null) {
      alert(noPriority);
    } else {
      await setDoc(doc(db, "tasks", randomKey), {
        title: newTaskTitle,
        desc: newTaskDesc,
        date: fullDate,
        time: fullTime,
        key: randomKey,
        priority: priority,
        priorityColor: priorityColor,
      }).then(() => {
        alert("Added Your Task");
      });
    }
  };

  // DELETE SINGE TASK
  const deleteTask = async (key) => {
    await deleteDoc(doc(db, "tasks", key)).then(() => {
      getData();
      // setTasks((prevTasks) => {
      //   return prevTasks.filter((tasks) => tasks.key != key);
      // });
    });
  };
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
  // OPEN ACTION SHEET
  const openAddToDo = () => {
    actionSheetRef.current?.setModalVisible();
  };
  // CLOSE ACTION SHEET
  const closeAddToDo = () => {
    actionSheetRef.current?.hide();
    setLow(false);
    setMedium(false);
    setHigh(false);
  };
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
  // ADD TASK.. IT WILL ADD THE TEXT INPUT VALUE TO THE TASKS ARRAY LOCALLY NOT FROM FIREBASE
  const addTask = () => {
    // validation
    if (newTaskTitle.length < 2) {
      alert(noTitle);
    } else if (newTaskDesc.length < 2) {
      alert(noDesc);
    } else if (priority === null) {
      alert(noPriority);
    } else {
      setTasks((prevTask) => {
        return [
          {
            title: newTaskTitle,
            desc: newTaskDesc,
            date: fullDate,
            time: fullTime,
            key: Math.random().toString(),
            priority: priority,
            priorityColor: priorityColor,
          },
          ...prevTask,
        ];
      });
      actionSheetRef.current?.hide();
      resetForm();
    }
  };
  const resetForm = () => {
    setNewTaskTitle("");
    setNewTaskDesc("");
    setData();
    setLow(false);
    setMedium(false);
    setHigh(false);
    setPriorityColor("");
    setPriority(null);
  };

  // UI
  return (
    // 1 JSK ELEMENT - - !important
    <>
      {/* ADDING HEADER COMPONENT AND PASSING TITLE TEXT AND ONPRESS EVENT */}
      <Header
        titleText="Home"
        onPress={openAddToDo}
        icon={
          <AntDesign
            name="pluscircle"
            size={40}
            color="orange"
            // style={headerStyles.addBtn}
          />
        }
      />
      {/* THE TASK HOLDING CARD */}
      <View style={ToDoStyles.ToDoContainer}>
        {/* DISPLAY ALL THE ITEMS IN TASK ARRAY */}
        {tasks?.[0] ? (
          <>
            <Text style={{ color: "green" }}>
              Double Click The Delete Button To Delete The Task
            </Text>
            <FlatList
              data={tasks}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View
                    style={{
                      ...ToDoStyles.ToDoCard,
                      backgroundColor: item.priorityColor,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("DetailedToDo", item, deleteTask)
                      }
                    >
                      <Text style={ToDoStyles.ToDoTitle}>{item.title}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteTask(item.key)}>
                      <AntDesign
                        name="delete"
                        size={40}
                        color="white"
                        style={{
                          alignSelf: "flex-end",
                          lineHeight: 100,
                          paddingRight: 40,
                          transform: [{ translateY: -100 }],
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
            />
          </>
        ) : (
          <View>
            <Text style={ToDoStyles.noTaskFoundText}>
              No Tasks Found.. Add Task To Utilize This App More
            </Text>
            <Image
              source={{
                uri: "https://static.thenounproject.com/png/511245-200.png",
              }}
              style={{ width: 200, height: 200, alignSelf: "center" }}
            />
            <Text
              style={{
                ...ToDoStyles.noTaskFoundText,
                textAlign: "left",
                paddingLeft: 20,
                paddingTop: 20,
              }}
            >
              Have A Nice Journy! 🤩
            </Text>
          </View>
        )}
      </View>
      {/* THE SHEET THAT'S POP UP'S TO ADD TASK */}
      <ActionSheet ref={actionSheetRef}>
        <View style={{ height: "100%" }}>
          {/* ADD TASK SECTION TITLE */}
          <Text style={ToDoStyles.addToDoTitle}>Add Task</Text>

          <View style={ToDoStyles.form}>
            {/* ADD TASK FORM */}
            {/* TASK TITLE INPUT */}
            <TextInput
              placeholder="Enter Task Title"
              placeholderTextColor="#005A9C"
              style={ToDoStyles.formInput}
              onChangeText={(title) => setNewTaskTitle(title)}
              value={newTaskTitle}
            />
            {/* TASK DESC INPUT */}
            <TextInput
              placeholder="Enter Task Description"
              placeholderTextColor="#005A9C"
              style={ToDoStyles.formInput}
              onChangeText={(desc) => setNewTaskDesc(desc)}
              value={newTaskDesc}
            />
            {/* TASK ENTERED DATE */}
            <Text style={ToDoStyles.formLabel}>Current Date: {fullDate}</Text>
            {/* TASK ENTERED TIME */}
            <Text style={ToDoStyles.formLabel}>Current Time: {fullTime}</Text>

            <Text style={{ paddingBottom: 10 }}></Text>
            {/* SETTING PRIORITY */}
            <Text
              style={{ color: priorityColor, paddingBottom: 20, fontSize: 20 }}
            >
              SELECT PRIORITY:
            </Text>
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
            <TouchableOpacity style={ToDoStyles.customAddBtn} onPress={addTask}>
              <Text style={ToDoStyles.customAddBtnText}>ADD</Text>
            </TouchableOpacity>

            {/* CLOSING ACTION SHEET BUTTON */}
            <TouchableOpacity
              style={ToDoStyles.customCloseBtn}
              onPress={closeAddToDo}
            >
              <Text style={ToDoStyles.customCloseBtnText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ActionSheet>
    </>
  );
}

// STYLES
const ToDoStyles = StyleSheet.create({
  ToDoContainer: {
    alignSelf: "center",
    paddingTop: 20,
    width: "90%",
  },
  ToDoCard: {
    // background color is set as priority color in the same line
    height: 100,
    width: "100%",
    borderRadius: 5,
    marginTop: 20,
  },
  ToDoTitle: {
    color: "white",
    textAlign: "center",
    lineHeight: 100,
    fontSize: 40,
    fontFamily: "titleText",
  },
  addToDoTitle: {
    color: "#005A9C",
    textAlign: "center",
    marginTop: 20,
    fontSize: 35,
  },
  form: {
    paddingHorizontal: 20,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#005A9C",
    color: "#005A9C",
    fontWeight: "bold",
    padding: 10,
    marginTop: 20,
    fontSize: 20,
  },
  formLabel: {
    color: "#005A9C",
    textAlign: "left",
    fontSize: 20,
    paddingTop: 20,
  },
  customAddBtn: {
    backgroundColor: "#005A9C",
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    width: "100%",
    alignSelf: "flex-start",
  },
  customAddBtnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  customCloseBtn: {
    backgroundColor: "#de0025",
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    width: "100%",
    alignSelf: "flex-end",
  },
  customCloseBtnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  taskPriorityText: {
    color: "#005A9C",
    fontSize: 20,
    fontFamily: "descText",
  },
  noTaskFoundText: {
    color: "red",
    textAlign: "center",
    fontSize: 15,
    marginTop: "2%",
    fontFamily: "descText",
  },
});