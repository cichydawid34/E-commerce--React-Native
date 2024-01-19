import * as React from "react";
import {useState} from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import MainSearchBar from "./mainSearchBar";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {getEvents} from "../services/eventsService";

export default function MainHeader() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const token = useSelector((state: any) => state.user.token);
    const [filters, setFilters] = useState([
            {name: 'genre', value: null},
            {name: 'city', value: null},
            {name: 'name', value: null},
        ]
    );

    function formatDate(dateString) {
        const options: any = {day: "numeric", month: "long", year: "numeric"};
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", options);
    }

    const fetchData = async () => {
        getEvents(token)
            .then((data) => {
                console.log(data.events);
                setEvents(data.events);
                setFilteredEvents(data.events);
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
            });
    };
    React.useEffect(() => {
        fetchData();
    }, []);


    function updateFilters(filter: { name: string, value: any }) {
        console.log('send',filter)
        filters.map((f) => {
            if (f.name == filter.name) {
                f.value = filter.value
            }
        })
        filterEvents()

    }

    function filterEvents() {
        let eventsToFilter = events
        const name = filters.find((e) => e.name === 'name')
        const genre = filters.find((e) => e.name === 'genre')
        const city = filters.find((e) => e.name === 'city')

        if (genre.value != "" && genre.value != null) {
            eventsToFilter = eventsToFilter.filter((e) => e.type === genre.value);
        }
        if (name.value != "" && name.value != null) {
            eventsToFilter = eventsToFilter.filter((e) => e.name.includes(name.value));
        }
        if (city.value != "" && city.value != null) {
            eventsToFilter = eventsToFilter.filter((e) => e.city === city.value);
        }
        setFilteredEvents(eventsToFilter)
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 25,
            }}
        >
            <View>
                <Text style={styles.suggestedHeader}>Suggested Events</Text>

                <View style={styles.scrollView}>
                    <ScrollView
                        horizontal={true}
                        alwaysBounceHorizontal={true}
                        alwaysBounceVertical={true}
                        bounces={true}
                        style={styles.cardsContainer}
                    >
                        <View style={styles.card}>
                            <Image
                                style={styles.cardImage}
                                source={{
                                    uri: "https://upload.wikimedia.org/wikipedia/en/e/eb/Lady_Pank.jpg",
                                }}
                            />
                            <Text style={styles.cardTitle}>Lady Pank</Text>
                        </View>
                        <View style={styles.card}>
                            <Image
                                style={styles.cardImage}
                                source={{
                                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj1mcWH7P3f653UTjrRjakdxGnPXTlNj9Z2g&usqp=CAU",
                                }}
                            />
                            <Text style={styles.cardTitle}>The Smiths</Text>
                        </View>
                        <View style={styles.card}>
                            <Image
                                style={styles.cardImage}
                                source={{
                                    uri: "data:image/jpeg;base64,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",
                                }}
                            />
                            <Text style={styles.cardTitle}>Billy Talent</Text>
                        </View>
                        <View style={styles.card}>
                            <Image
                                style={styles.cardImage}
                                source={{
                                    uri: "data:image/jpeg;base64,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",
                                }}
                            />
                            <Text style={styles.cardTitle}>Billy Talent</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
            <View style={styles.searchBar}>
                <MainSearchBar updateFilters={updateFilters}/>
            </View>

            <ScrollView>
                <View style={styles.eventsContainer}>
                    {filteredEvents.map((event: any) => {
                        return (
                            <TouchableOpacity
                                style={styles.stripe}
                                onPress={() =>
                                    navigation.navigate("EventDetails", {eventId: event._id})
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
                                        {formatDate(event.startDate)}
                                    </Text>
                                    <Text style={styles.stripeTitle}>{event.name}</Text>
                                    <Text style={styles.stripeType}>{event.type}</Text>
                                    <Text style={styles.stripePlace}>
                                        <Image
                                            style={styles.marker}
                                            source={require("../assets/google-marker.png")}
                                        />
                                        {event.city}, {event.street}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
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
        marginTop: 8,
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
        fontSize: 13,
        color: "#696969",
        marginLeft: -2,
        marginTop: 12,
        marginBottom: 8,
    },
    marker: {
        width: 20,
        height: 20,
        marginRight:2
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
