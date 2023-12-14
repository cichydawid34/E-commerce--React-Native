import * as React from "react";
import { View } from "react-native";
import MainHeader from "../../components/mainHeader";

export default function MainScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MainHeader />
    </View>
  );
}
