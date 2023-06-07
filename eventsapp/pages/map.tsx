import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeToken, setToken } from "../redux/userSlice";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  const [pins, setPins] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://10.0.2.2:9090/events", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        const data = await response.json();
        console.log("Fetched data:", data.events);
        setPins(data.events);
      } catch (error) {
        console.error("Error fetching pins:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Mapa</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 51.9189046,
          longitude: 19.1343786,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {pins.map((pin) => {
          return (
            <Marker
              key={pin._id}
              coordinate={{
                latitude: pin.latitude,
                longitude: pin.longtitude,
              }}
              title={pin.name}
              description={pin.genre}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
