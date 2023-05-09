import * as React from "react";
import { Button, View, Text, StyleSheet, Image, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeToken, setToken } from "../redux/userSlice";
export default function SearchBar() {
  const [name, setName] = React.useState("");
  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/151/151773.png",
        }}
      />
      <TextInput
        underlineColorAndroid="transparent"
        value={name}
        onChangeText={(e) => setName(e)}
        placeholder={"Search name"}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gainsboro",
    padding: 4,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  input: {
    width: "100%",

    paddingHorizontal: 20,
  },
  icon: {
    width: 10,
    height: 10,
    padding: 10,
  },
});
