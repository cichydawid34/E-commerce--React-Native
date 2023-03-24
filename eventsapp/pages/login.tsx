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
} from "react-native";
import { useDispatch } from "react-redux";

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [emailErrorMessage, setemailErrorMessage] = React.useState(false);

  const [password, setPassword] = React.useState("");
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [passwordErrorMessage, setpasswordErrorMessage] = React.useState(false);
  const dispatch = useDispatch();
  const [token, setToken] = React.useState();
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(regex.test(email));
  };

  const validatePassword = (password) => {
    setIsPasswordValid(password.length >= 7);
  };

  const handleLogin = async () => {
    if (isEmailValid && password.length > 0) {
      console.log("xd");
      let ret = await axios
        .post("https://red-mountain-shop-backend.onrender.com/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log("xd3");
          let token = JSON.stringify(response.data);
          console.log(token);
        })
        .then(() => {
          dispatch({ type: "setToken", payload: token });
          navigation.navigate("SplashScreen");
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
        source={require("../assets/loginImage.png")}
      />
      <View style={styles.formContainer}>
        <Text style={styles.textHeader}>Sign in</Text>
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
        {!isEmailValid ? (
          <Text style={styles.errorMessage}>Email is invalid</Text>
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
        <TouchableOpacity onPress={() => alert("Forgot password?")}>
          <Text style={styles.textLink}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Sign up for an account.")}>
          <Text style={styles.textLink}>Don't have an account?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButton]}
          onPress={handleLogin}
          disabled={!isEmailValid || !isPasswordValid}
        >
          <Text>Login</Text>
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
    color: "white",
    fontSize: 16,
    borderColor: "red",
    borderWidth: 2,
    padding: 4,
    paddingHorizontal: 26,
    textAlign: "center",
    backgroundColor: "lightcoral",
    borderRadius: 4,
    fontWeight: "bold",
    marginTop: 10,
  },
  errorMessage: {
    color: "red",
    textAlign: "right",
    marginLeft: "auto",
  },
});
