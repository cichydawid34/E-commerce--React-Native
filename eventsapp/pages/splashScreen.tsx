import * as React from "react";
import { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen() {
  const [favorites, setFavorites] = React.useState([]);

  async function GetFavorites() {
    const items = await AsyncStorage.getItem("FAVORITES");
    if (items) {
      setFavorites(JSON.parse(items));
      console.log(favorites);
    }
  }

  useEffect(() => {
    GetFavorites();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!favorites ? (
        <Text
          style={{
            marginTop: 120,
            fontSize: 24,
            color: "gray",
          }}
        >
          No Favorite Events
        </Text>
      ) : (
        <React.Fragment>
          <Text
            style={{
              marginTop: 24,
              backgroundColor: "#CD5C5C",
              color: "white",
              padding: 4,
              paddingHorizontal: 90,
              borderRadius: 10,
              fontSize: 20,
              fontWeight: "bold",
              marginRight: "auto",
              marginLeft: "auto",
              marginBottom: 10,
            }}
          >
            Favorite Events
          </Text>
          <ScrollView>
            {favorites.map((event) => {
              return (
                <TouchableOpacity style={styles.card}>
                  <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                    {event.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity style={styles.card}>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Sylwester z Marzeń
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </React.Fragment>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    padding: 14,
    width: 350,
    fontSize: 20,
    fontWeight: "bold",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 17,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
