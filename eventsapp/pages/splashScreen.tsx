import * as React from "react";
import { Text, View } from "react-native";

export default function SplashScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          color: "gray",
        }}
      >
        No Favorite Events
      </Text>
    </View>
  );
}
