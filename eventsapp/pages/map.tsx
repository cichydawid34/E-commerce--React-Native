import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeToken, setToken } from "../redux/userSlice";
export default function MapScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Mapa</Text>
    </View>
  );
}
