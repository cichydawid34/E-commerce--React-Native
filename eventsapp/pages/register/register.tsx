import { StatusBar } from "expo-status-bar";
import React from "react";
import Toast from "react-native-toast-message";
import { styles } from "./registerStyle";
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RegisterUser } from "../../services/userSevice";

export default function Register({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const [password, setPassword] = React.useState("");
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  //Email validation
  const validateEmail = (email: string): void => {
    const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
      setIsEmailValid(true);
      setEmailErrorMessage(null);
    } else {
      setIsEmailValid(false);
      setEmailErrorMessage("Email is invalid");
    }
  };

  //Password validation
  const validatePassword = (password: string): void => {
    if (password.length >= 7) {
      setIsPasswordValid(true);
      setPasswordErrorMessage(null);
    } else {
      setIsPasswordValid(false);
      setPasswordErrorMessage("Password have at least 7 characters");
    }
  };

  const handleRegister = async (): Promise<void> => {
    console.log("isEmailValid:", isEmailValid);
    console.log("isPasswordValid:", isPasswordValid);
    if (isEmailValid && isPasswordValid)
      try {
        console.log("start register");
        setIsLoading(true);
        console.log("email:", email);
        console.log("password:", password);

        await RegisterUser(email, password)
          .then((response: any) => {
            console.log("Register Response: " + response);
          })
          .then(() => {
            Toast.show({
              type: "success",
              text1: "Success",
              text2: "You have successfully created an account👋",
            });
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error: any) {
        console.log("Register error: " + error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `${error} `,
        });
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    else {
      alert("Please enter a valid email and password.");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/registerImage.png")}
        />
        <View style={styles.formContainer}>
          <Text style={styles.textHeader}>Register</Text>

          <TextInput
            style={[
              styles.input,
              !isEmailValid && email.length > 0 && styles.invalidInput,
            ]}
            placeholder="email"
            onChangeText={(text: string): void => {
              setEmail(text);
              validateEmail(text);
            }}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {emailErrorMessage ? (
            <Text style={styles.errorMessage}>{emailErrorMessage}</Text>
          ) : null}

          <TextInput
            style={[
              styles.input,
              !isPasswordValid && password.length > 0 && styles.invalidInput,
            ]}
            onChangeText={(text: string): void => {
              setPassword(text);
              validatePassword(text);
            }}
            value={password}
            placeholder="password"
            secureTextEntry={true}
          />

          {passwordErrorMessage ? (
            <Text style={styles.errorMessage}>{passwordErrorMessage}</Text>
          ) : null}
          <TouchableOpacity onPress={() => alert("Forgot password?")}>
            <Text style={styles.textLink}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert("Sign up for an account.")}>
            <Text
              style={styles.textLink}
              onPress={() => navigation.navigate("Login")}
            >
              Already have an account?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.loginButton]}
            onPress={handleRegister}
            disabled={!isEmailValid || !isPasswordValid || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.textButton}>Register</Text>
            )}
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
      <Toast />
    </>
  );
}
