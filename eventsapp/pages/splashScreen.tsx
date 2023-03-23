import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login";
export default function SplashScreen({ navigation }) {
  let isLogged = true;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      {isLogged ? (
        <View>
          <Button
            title="Go to Login"
            onPress={() => navigation.navigate("Login")}
          />
          <Button
            title="Go to Register"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      ) : null}
    </View>
  );
}
