import { StyleSheet, Dimensions } from "react-native";

const primaryColor = "#ff7878";

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

const centerHeight = height / 2;

const darkMode = StyleSheet.create({
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
    // color: "#ff7878",
    color: primaryColor,
    textAlign: "center",
    marginTop: 20,
    fontSize: 35,
  },
  form: {
    paddingHorizontal: 20,
    backgroundColor: "#000",
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
});

export default darkMode;
