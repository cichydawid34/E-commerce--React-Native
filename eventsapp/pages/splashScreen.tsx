import * as React from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export default function SplashScreen() {
    const [events, setEvents] = React.useState(null);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    async function getEvents() {
        const favorites = await AsyncStorage.getItem("FAVORITES");
        const array = JSON.parse(favorites);
        console.log('Favorite', array)
        if (array && array.length !== 0) {
            setEvents(array);
            console.log('FavoriteEvents', array)
        } else {
            console.log('No FavoriteEvents')
            setEvents(null)
        }
    }

    useEffect(() => {
        getEvents()
    }, []);


    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {!events || events.length === 0 ? (
                <Text
                    style={{
                        fontSize: 24,
                        color: "gray",
                    }}
                >
                    No Favorite Events
                </Text>
            ) : (
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop:3
                    }}
                >
                    <Text style={{
                        backgroundColor: "#CD5C5C",
                        color: "white",
                        padding: 4,
                        paddingHorizontal: 90,
                        borderRadius: 10,
                        fontSize: 20,
                        fontWeight: "bold",
                        marginRight: "auto",
                        marginLeft: "auto",
                        marginTop: 8,
                        marginBottom: 10,
                    }}>Favorites</Text>
                    <ScrollView>
                        <View>
                            {events && events.map((event: any) => {
                                return (
                                    <TouchableOpacity
                                        style={styles.stripe}
                                        onPress={() =>
                                            navigation.navigate("EventDetails", { eventId: event._id })
                                         }
                                    >
                                        <Image
                                            style={styles.stripeImage}
                                            source={{
                                                uri: event.image,
                                            }}
                                        />
                                        <View style={styles.stripedInformations}>
                                            <Text style={styles.stripeDate}>
                                                {/*{formatDate(event.startDate)}*/}
                                            </Text>
                                            <Text style={styles.stripeTitle}>{event.name}</Text>
                                            <Text style={styles.stripeType}>{event.type}</Text>
                                            <Text style={styles.stripePlace}>
                                                <Image
                                                    style={styles.marker}
                                                    source={require("../assets/google-marker.png")}
                                                />
                                                {event.street}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )

                            })}
                        </View>
                    </ScrollView>
                </View>
            )}
        </View>

    )
}
const styles = StyleSheet.create({
    eventsBarContainer: {
        marginBottom: "auto",
        display: "flex",
        flexDirection: "row",
        gap: 10,
        width: 30,
        backgroundColor: "#fff",
        justifyContent: "center",
        marginLeft: 30,
    },
    suggestedHeader: {
        backgroundColor: "#CD5C5C",
        color: "white",
        padding: 4,
        paddingHorizontal: 90,
        borderRadius: 10,
        fontSize: 20,
        fontWeight: "bold",
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: 0,
        marginBottom: 10,
    },
    card: {
        width: 140,
        marginRight: 14,
        borderRadius: 19,
        height: 120,
    },
    cardImage: {
        width: 140,
        height: 90,
        borderRadius: 10,
    },
    eventsContainer: {
        paddingTop: 20,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 11,
    },
    stripe: {
        width: 360,
        display: "flex",
        alignItems: "center",
        padding: 3,
        paddingLeft: 15,
        flexDirection: "row",
        gap: 8,
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
        marginBottom:13
    },
    stripeImage: {
        marginTop: -2,
        marginBottom: 2,
        width: 100,
        height: 100,
        margin: "auto",
        padding: "auto",
        borderRadius: 10,
    },
    stripedInformations: {
        marginLeft: 16,
    },
    stripeDate: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: "bold",
        color: "#CD5C5C",
    },
    stripeTitle: {
        fontSize: 19,
        fontWeight: "bold",
        marginTop: 0,
    },
    stripeType: {
        fontSize: 14,
        marginTop: 0,
    },
    stripePlace: {
        fontSize: 15,
        color: "#696969",
        marginLeft: -3,
        marginTop: 12,
        marginBottom: 8,
    },
    marker: {
        width: 20,
        height: 20,
    },
    scrollView: {
        height: 130,
    },
    cardsContainer: {
        display: "flex",
        flexDirection: "row",
    },
    cardTitle: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
        width: "100%",
        marginTop: 2,
    },
    searchBar: {
        display: "flex",
        flexDirection: "row",
        zIndex: 1,
        width: "55%",
        marginTop: 1,
    },
    dropdown: {
        width: 10,
    },
});

