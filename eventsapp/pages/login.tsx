import axios from "axios";
import { StatusBar } from "expo-status-bar";

import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setToken } from "../redux/userSlice";

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [emailErrorMessage, setemailErrorMessage] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [passwordErrorMessage, setpasswordErrorMessage] = React.useState(false);
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(regex.test(email));
  };

  const validatePassword = (password) => {
    setIsPasswordValid(password.length > 0);
  };

  const handleLogin = async () => {
    if (isEmailValid && password.length > 0) {
      try {
        setIsLoading(true);
        let token = await axios.post("http://10.0.2.2:9090/login", {
          email: email,
          password: password,
        });

        dispatch(setToken(token.data.token));
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `${error.message} `,
        });
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please enter a valid email and password.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image
        style={styles.image}
        source={require("../assets/loginImage.png")}
      />
      <View style={styles.formContainer}>
        <Text style={styles.textHeader}>Sign in</Text>

        {/* Email input */}
        <TextInput
          style={[
            styles.input,
            !isEmailValid && email.length > 0 && styles.invalidInput,
          ]}
          placeholder="email"
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
          }}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {/* Email error message */}
        {!isEmailValid && email.length > 0 ? (
          <Text style={styles.errorMessage}>Email is invalid</Text>
        ) : null}

        {/* Password input */}
        <TextInput
          style={[
            styles.input,
            !isPasswordValid && password.length > 0 && styles.invalidInput,
          ]}
          onChangeText={(text) => {
            setPassword(text);
            validatePassword(text);
          }}
          value={password}
          placeholder="password"
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={() => alert("Forgot password?")}>
          <Text style={styles.textLink}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text
            style={styles.textLink}
            onPress={() => navigation.navigate("Register")}
          >
            Don't have an account?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButton]}
          onPress={handleLogin}
          disabled={!isEmailValid || !isPasswordValid || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.textButton}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
      <Toast />
    </View>
  );
}

//Styling
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  textHeader: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textLink: {
    marginTop: 10,
    fontSize: 14,
    color: "#0080ff",
    textDecorationLine: "underline",
  },
  input: {
    height: 50,
    width: 300,
    margin: 10,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    fontSize: 16,
  },
  invalidInput: {
    borderColor: "red",
  },
  image: {
    width: 270,
    height: 270,
  },
  loginButton: {
    borderColor: "red",
    borderWidth: 2,
    padding: 7,
    paddingHorizontal: 56,
    textAlign: "center",
    backgroundColor: "indianred",
    borderRadius: 4,
    marginTop: 10,
  },
  textButton: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    textAlign: "right",
    marginLeft: "auto",
  },
});
