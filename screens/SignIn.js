import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Image,
  ScrollView,
} from "react-native";
// ANIMATION
import * as Animatable from "react-native-animatable";
// ICONS
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
// THEME IN REACT NATIVE PAPER
import { useTheme } from "react-native-paper";
// FIREBASE IMPORTS
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

const SignIn = ({ navigation }) => {
  // CHECKING IF USER IS THERE
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("SignIn");
      }
    });
  }, [auth]);

  // USER DATA => USER NAME AND STUFF
  const [data, setData] = React.useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  // COLOR FROM REACT NATIVE PAPER
  const { colors } = useTheme();
  // SCROLL VIEW REF TO MAKE SCROLLER GO TOP IF THER EIS AN ERROR MESSAGE
  const scrollRef = useRef();
  // ERROR MESSAGE STORING AREA
  const [errorMessage, setErrorMessage] = useState(null);

  // FIREBASE
  const auth = getAuth();

  // FUNCTIONS
  // IF ERROR THE SCROLL VIEW GOES TO THE TOP
  const scrollTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  // HANDLE CHANGES
  const textInputChange = (val) => {
    if (val.trim().length >= 1) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };
  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };
  const loginHandle = () => {
    if (data.username.length < 1) {
      setErrorMessage("Enter User Name");
      scrollTop();
    } else if (data.password.length < 8) {
      setErrorMessage("Password Must Be 8 Characters Long");
      scrollTop();
    } else {
      signIn();
    }
  };
  // !important => FIREBASE SIGN IN
  const signIn = async () => {
    signInWithEmailAndPassword(auth, data.username, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        // NAVIGATE TO HOME SCREEN
        navigation.navigate("Home");
        setErrorMessage(null);
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;

        if (errorCode == "auth/wrong-password") {
          setErrorMessage("Incorrect Password");
        } else if (errorCode == "auth/user-not-found") {
          setErrorMessage("User Not Found, Register To Continue");
        } else if (errorCode == "auth/too-many-requests") {
          setErrorMessage(
            "You have Signed In To Many Times Within 24hrs. try again after some time"
          );
        } else {
          setErrorMessage(errorCode);
        }

        scrollTop();
      });
  };
  const forgotPassword = async () => {
    sendPasswordResetEmail(auth, data.username)
      .then(() => {
        // Password reset email sent!
        alert(
          `An email has been sent to ${data.username}. you can change your password there`
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode == "auth/invalid-email") {
          alert("Check Your Email It Is Invalid");
        }
      });
  };
  // JSK
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ff8205" barStyle="light-content" />
      <View style={styles.header}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.image_header}
        />
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <ScrollView ref={scrollRef}>
          <>
            {errorMessage ? (
              <View style={styles.errorArea}>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              </View>
            ) : (
              <Text /> // SIMPLY NOTHING
            )}
          </>

          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
              },
            ]}
          >
            Email
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Your Email"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {/* CHECKING IF ERROR MESSAGE IS THERE */}

          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Enter User Name</Text>
            </Animatable.View>
          )}

          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
                marginTop: 35,
              },
            ]}
          >
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={colors.text} size={20} />
            <TextInput
              placeholder="Your Password"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password must be 8 characters long.
              </Text>
            </Animatable.View>
          )}

          <TouchableOpacity onPress={forgotPassword}>
            <Text style={styles.forgotTxt}>Forgot Password ?</Text>
          </TouchableOpacity>

          <View style={styles.button}>
            <TouchableOpacity
              style={{ ...styles.signIn, backgroundColor: "#ff8205" }}
              onPress={() => {
                loginHandle(data.username, data.password);
              }}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
              style={[
                styles.signIn,
                {
                  borderColor: "#ff8205",
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#ff8205",
                  },
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

// STYLES FOR THIS SCREEN
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff8205",
  },
  header: {
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  image_header: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 55,
    borderRadius: 10,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#ff8205",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  errorArea: {
    backgroundColor: "#FA2A55",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
    marginBottom: 15,
    width: "100%",
  },
  errorMessage: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "500",
    letterSpacing: 2,
  },
  forgotTxt: {
    marginTop: 20,
  },
});
// !importing => EXPORTING
export default SignIn;

