import * as React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";

export default function EventDetails({ route, navigation }) {
  const [event, setEvent] = React.useState(null);
  const { eventId } = route.params;
  const token = useSelector((state) => state.user.token);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(eventId);
        const response = await fetch(
          `http://10.0.2.2:9090/events/event/${eventId}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-access-token": token,
            },
            method: "GET",
          }
        );
        const data = await response.json();
        console.log("Fetched data:", data.event.longtitude);
        setEvent(data.event);
        console.log(event.image);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchData();
  }, []);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        style={styles.image}
        source={{
          uri: event.image,
        }}
      />
      <Text style={styles.header}>{event.name}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <Text style={styles.dateEvent}>12.07.2023 Kraków Sukiennicza 24</Text>
      {event.latitude && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: event.latitude,
            longitude: event.longtitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: event.latitude,
              longitude: event.longtitude,
            }}
            title={event.name}
            description={event.genre}
          />
        </MapView>
      )}
      <Text>Price 13$</Text>
      <Pressable style={styles.button}>
        <Text style={styles.text}>Buy Ticket</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "80%",
    height: 200,
  },
  image: {
    height: 300,
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
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  description: {
    marginBottom: 12,
  },
  dateEvent: {
    backgroundColor: "indianred",
    color: "white",
    padding: 2,

    marginBottom: 8,
  },
});
