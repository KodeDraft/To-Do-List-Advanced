import { StyleSheet, Dimensions } from "react-native";

// GETTING THE HEIGHT OF THE SCREEN
const { height } = Dimensions.get("window");

// CENTER OF THE SCREEN
const centerHeight = height / 2;

// DEFAULT COLOR FOR THE ADD TASK MODAL
const primaryColor = "#ff7878";

const darkMode = StyleSheet.create({
  // COMMON
  container: {
    backgroundColor: "#000",
    height: "100%",
    width: "100%",
  },
  title: {
    color: "#000",
    fontSize: 20,
    color: "dodgerblue",
    fontWeight: "bold",
  },
  // ADD TASK MODAL
  addToDoTitle: {
    color: primaryColor,
    textAlign: "center",
    marginTop: 20,
    fontSize: 35,
  },
  form: {
    paddingHorizontal: 20,
    backgroundColor: "#000",
    borderWidth: 2,
    borderColor: primaryColor,
  },
  formInput: {
    borderWidth: 1,
    borderColor: primaryColor,
    color: primaryColor,
    fontWeight: "bold",
    height: 35,
    marginTop: 20,
    fontSize: 20,
    paddingLeft: 10,
  },
  formLabel: {
    color: primaryColor,
    textAlign: "left",
    fontSize: 20,
    paddingTop: 20,
  },
  customAddBtn: {
    backgroundColor: primaryColor,
    height: 30,
    marginTop: 20,
    borderRadius: 3,
    width: "100%",
    alignSelf: "flex-start",
  },
  customAddBtnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 30,
  },
  customCloseBtn: {
    backgroundColor: "#de0025",
    marginTop: 10,
    borderRadius: 3,
    width: "100%",
    alignSelf: "flex-end",
    height: 30,
    marginBottom: 20,
  },
  customCloseBtnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 30,
  },
  taskPriorityText: {
    color: primaryColor,
    fontSize: 20,
    fontFamily: "descText",
  },
  noTasksTxt: {
    textAlign: "center",
    lineHeight: centerHeight,
    color: "#fff",
  },
  // DETAILED TASK STYLES

  header: {
    width: "100%",
    height: 50,
  },
  taskContainer: {
    backgroundColor: "#000",
    height: "40%",
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  taskTitle: {
    color: "black",
    fontSize: 40,
    textAlign: "center",
    paddingTop: 20,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  label: {
    color: "#fff",
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 20,
  },
  customDelBtn: {
    backgroundColor: "red",
    padding: 15,
    alignSelf: "center",
    width: "90%",
    marginTop: 20,
  },
  customDelBtnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default darkMode;
