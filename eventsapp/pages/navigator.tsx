import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeToken, setToken } from "../redux/userSlice";
const Stack = createNativeStackNavigator();
import Register from "./register";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "./splashScreen";
import MainScreen from "./main";
import MapScreen from "./map";
export default function Navigator() {
  const dispatch = useDispatch();

  const Tab = createBottomTabNavigator();
  const { token } = useSelector((state: RootState) => state.user);

  return (
    <>
      {token == null ? (
        // No token found, user isn't signed in
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Sign in",
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: "Sign in",
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
            }}
          />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator>
          {/* // User is signed in */}
          <Tab.Screen name="SplashScr" component={SplashScreen} />
          <Tab.Screen name="Main" component={MainScreen} />
          <Tab.Screen name="Map" component={MapScreen} />
        </Tab.Navigator>
      )}
    </>
  );
}
