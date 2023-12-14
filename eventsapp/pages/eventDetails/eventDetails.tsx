import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../constants";

export default function EventDetails({ route, navigation }) {
  const [event, setEvent] = React.useState(null);
  const { eventId } = route.params;
  const token = useSelector((state: any) => state.user.token);
  const [isInFavorites, setIsInFavorites] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${BASE_URL}:9090/api/events/event/${eventId}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-access-token": token ? token : null,
            },
            method: "GET",
          },
        );
        const data = await response.json();
        console.log("Fetched data:", data.event);
        setEvent(data.event);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    checkFavorite();
    fetchData();
  }, []);

  async function checkFavorite() {
    const favorites = await AsyncStorage.getItem("FAVORITES");
    let isFav = false;
    if (favorites) {
      const array = JSON.parse(favorites);

      array.map((x) => {
        if (x.name == event.name) {
          isFav = true;
        }
      });
      setIsInFavorites(isFav);
      return isFav;
    }
    setIsInFavorites(isFav);
    return isFav;
  }

  async function addToFavorites() {
    const favorites = await AsyncStorage.getItem("FAVORITES");
    console.log(favorites);
    if (!favorites) {
      const items = [];
      items.push(event);
      console.log(items);
      await AsyncStorage.setItem("FAVORITES", JSON.stringify(items));
      checkFavorite();
    } else {
      const items = JSON.parse(favorites);
      checkFavorite();
      if (isInFavorites) {
        const index = items.findIndex((event) => event.name === event.name);
        items.splice(index, 1);
        await AsyncStorage.setItem("FAVORITES", JSON.stringify(items));
        checkFavorite();
      } else {
        items.push(event);
        await AsyncStorage.setItem("FAVORITES", JSON.stringify(items));
        checkFavorite();
      }
    }
  }

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <ScrollView
        style={{ flex: 1, display: "flex", width: 460, paddingHorizontal: 20 }}
      >
        <Image
          style={styles.image}
          source={{
            uri: event.image,
          }}
        />
        <>
          <Text style={styles.header}>{event.name}</Text>

          {event.latitude && (
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: event.latitude,
                  longitude: event.longitude,
                  latitudeDelta: 1.0922,
                  longitudeDelta: 1.0421,
                }}
              >
                <Marker
                  key="1"
                  coordinate={{
                    latitude: event.latitude,
                    longitude: event.longitude,
                  }}
                  title={event.name}
                  description={event.street}
                />
              </MapView>
            </View>
          )}

          <Text style={styles.header}>About</Text>
          <Text style={styles.description}>{event.description}</Text>
          <Text style={styles.dateEvent}>12.07.2023 Kraków Sukiennicza 24</Text>

          <Pressable style={styles.button} onPress={addToFavorites}>
            {isInFavorites ? (
              <Text style={styles.text}>Add to Favorites </Text>
            ) : (
              <Text style={styles.text}>Remove from Favorites</Text>
            )}
          </Pressable>
        </>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mapContainer: {
    width: "95%",
    height: 150,
    borderRadius: 30,
    overflow: "hidden",
  },
  map: {
    height: 150,
  },
  image: {
    height: 230,
    width: "100%",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  button: {
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    fontWeight: "bold",
    color: "white",
  },
  header: {
    fontSize: 29,
    fontWeight: "bold",
    marginRight: "auto",
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 10,
  },
  description: {
    color: "#4949494",
    width: "90%",
    marginBottom: 12,
    fontSize: 16,
  },
  dateEvent: {
    backgroundColor: "indianred",
    color: "white",
    padding: 2,
    fontSize: 16,
    marginBottom: 8,
  },
});
