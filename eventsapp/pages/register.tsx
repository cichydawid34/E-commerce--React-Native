import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

export default function Register({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  const [token, setToken] = useState(null);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
      setIsEmailValid(true);
      setEmailErrorMessage(null);
    } else {
      setIsEmailValid(false);
      setEmailErrorMessage("Email is invalid");
    }
  };

  const validatePassword = (password) => {
    if (password.length >= 7) {
      setIsPasswordValid(true);
      setPasswordErrorMessage(null);
    } else {
      setIsPasswordValid(false);
      setPasswordErrorMessage("Password have at least 7 characters");
    }
  };

  const handleRegister = async () => {
    if (isEmailValid && isPasswordValid) {
      let ret = await axios
        .post("https://red-mountain-shop-backend.onrender.com/register", {
          email: email,
          password: password,
        })
        .then((response) => {
          setToken(response.data);
        })
        .then(() => {
          navigation.navigate("Login");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please enter a valid email and password.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/registerImage.png")}
      />
      <View style={styles.formContainer}>
        <Text style={styles.textHeader}>Register</Text>

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
        {emailErrorMessage ? (
          <Text style={styles.errorMessage}>{emailErrorMessage}</Text>
        ) : null}

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

        {passwordErrorMessage ? (
          <Text style={styles.errorMessage}>{passwordErrorMessage}</Text>
        ) : null}
        <TouchableOpacity onPress={() => alert("Forgot password?")}>
          <Text style={styles.textLink}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Sign up for an account.")}>
          <Text style={styles.textLink}>Don't have an account?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.loginButton]} onPress={handleRegister}>
          <Text style={[styles.loginButtonText]}>Register</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

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
  textLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "grey",
    marginRight: "auto",
    marginLeft: 12,
  },
  textLink: {
    marginTop: 10,
    fontSize: 14,
    color: "#0080ff",
  },
  input: {
    height: 50,
    width: 300,
    margin: 10,
    marginBottom: 0,
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
    color: "white",
    fontSize: 16,
    borderColor: "red",
    borderWidth: 2,
    padding: 7,
    paddingHorizontal: 56,
    textAlign: "center",
    backgroundColor: "indianred",
    borderRadius: 4,
    fontWeight: "bold",
    marginTop: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    textAlign: "right",
    marginLeft: "auto",
  },
});
