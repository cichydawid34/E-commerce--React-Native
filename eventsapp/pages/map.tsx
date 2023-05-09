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
  let pins = [
    {
      name: "The Cure",
      lat: 50.06465,
      lon: 19.94498,
      genre: "koncert",
    },
    {
      name: "Pod Mostem",
      lat: 50.012101,
      lon: 20.985841,
      genre: "koncert",
    },
    {
      name: "Biegi 'Przełaj'",
      lat: 52.237049,
      lon: 21.017532,
      genre: "Maraton",
    },
  ];
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
              coordinate={{ latitude: pin.lat, longitude: pin.lon }}
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
