import { StyleSheet } from "react-native";

const lightMode = StyleSheet.create({
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
  // ADD TASK MODAL
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
    // padding: 10,
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
});

export default lightMode;
