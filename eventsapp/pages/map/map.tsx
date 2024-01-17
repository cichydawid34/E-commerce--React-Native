import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { BASE_URL } from "../../constants";
import MainSearchBar from "../../components/mainSearchBar";

export default function MapScreen() {
  const [pins, setPins] = React.useState([]);
  const token = useSelector((state: any) => state.user.token);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  function updateFilters(filter) {
    // setFilters(filters.push(filter));
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    const fetchData = async () => {
      try {
        const response = await fetch(`http://${BASE_URL}:9090/api/events`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          method: "GET",
        });
        const data = await response.json();
        //console.log("Fetched data:", data.events);
        setPins(data.events);
      } catch (error) {
        console.error("Error fetching pins:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <View
        style={{
          position: "absolute",
          zIndex: 2,
          top: 30,
        }}
      >
        <MainSearchBar updateFilters={updateFilters} />
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location ? location.coords.latitude : 51.9189046,
          longitude: location ? location.coords.longitude : 19.1343786,
          latitudeDelta: 1.0922,
          longitudeDelta: 1.0421,
        }}
      >
        {pins.map((pin) => {
          return (
            <Marker
              key={pin._id}
              coordinate={{
                latitude: pin.latitude,
                longitude: pin.longitude,
              }}
              title={pin.name}
              description={pin.type}
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
    position: "relative",
  },
  map: {
    zIndex: 1,
    width: "100%",
    height: "100%",
  },
});
