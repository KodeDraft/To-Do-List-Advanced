import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const centerHeight = height / 2;

const lightMode = StyleSheet.create({
  // COMMON
  container: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
  },
  title: {
    color: "#000",
    fontSize: 20,
    color: "dodgerblue",
    fontWeight: "bold",
  },
  // ADD TASK MODAL STYLES
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
    height: 35,
    marginTop: 20,
    fontSize: 20,
    paddingLeft: 10,
  },
  formLabel: {
    color: "#005A9C",
    textAlign: "left",
    fontSize: 20,
    paddingTop: 20,
  },
  customAddBtn: {
    backgroundColor: "#005A9C",
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
    color: "#005A9C",
    fontSize: 20,
    fontFamily: "descText",
  },
  noTasksTxt: {
    textAlign: "center",
    lineHeight: centerHeight,
    color: "#000",
  },
  // DETAILED TASK STYLES
  header: {
    width: "100%",
    height: 50,
  },
  taskContainer: {
    backgroundColor: "#fff",
    // height: "40%",
    paddingBottom: 40,
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "red",
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
    color: "#000",
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

export default lightMode;
