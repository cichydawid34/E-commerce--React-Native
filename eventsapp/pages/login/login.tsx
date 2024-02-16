import { StatusBar } from "expo-status-bar";
import { styles } from "./loginStyles";
import React from "react";
import { LoginUser } from "../../services/userSevice";
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/userSlice";

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(false);

  const [password, setPassword] = React.useState("");
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useDispatch();

  const validateEmail = (email: string): void => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(regex.test(email));
  };

  const validatePassword = (password: string): void => {
    setIsPasswordValid(password.length > 0);
  };

  const handleLogin = async () => {
    if (isEmailValid && password.length > 0) {
      setIsLoading(true);
      console.log(password);
      console.log(email);
      await LoginUser(email, password)
        .then((data: any) => {
          dispatch(setToken(data));
        })
        .catch((error) => {
          console.log(error, "Caught error");
          Toast.show({
            type: "error",
            text1: "Error",
            text2: `${error} `,
          });
        })
        .finally((): void => {
          setIsLoading(false);
        });
    } else {
      alert("Please enter a valid email and password.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image
        style={styles.image}
        source={require("../../assets/loginImage.png")}
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
            //onPress={() => navigation.navigate("Register")}
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

