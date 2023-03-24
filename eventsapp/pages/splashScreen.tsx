import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeToken } from "../redux/tokenSlice";
export default function SplashScreen({ navigation }) {
  const dispatch = useDispatch();

  const [token, setToken] = React.useState("");
  React.useEffect(() => {
    setToken(useSelector((state: RootState) => state.token.token));
    if (token == null) {
      console.log("token null");
      console.log(token);
    }
    if (token != null) {
      console.log("token not null");
      console.log(token);
    }
  }, [token]);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      {token == null ? (
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
      ) : (
        <View>
          <Button title="Remove Token" onPress={() => dispatch(removeToken)} />
        </View>
      )}
    </View>
  );
}
