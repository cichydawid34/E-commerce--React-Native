import * as React from "react";
import {useEffect, useState} from "react";
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
import { useIsFocused } from '@react-navigation/native';
export default function MainHeader() {
    const [events, setEvents] = useState([]);
    const [suggestedEvents, setSuggestedEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const token = useSelector((state: any) => state.user.token);
    const [filters, setFilters] = useState([
            {name: 'genre', value: null},
            {name: 'city', value: null},
            {name: 'name', value: null},
        ]
    );
    var def = 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=';
    const isFocused = useIsFocused();
    function formatDate(dateString) {
        const options: any = {day: "numeric", month: "long", year: "numeric"};
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", options);
    }




    useEffect(() => {
        isFocused && fetchData()
    },[isFocused]);

    const fetchData = async () => {
        getEvents(token)
            .then((data) => {
                console.log(data.events);
                setEvents(data.events);
                setFilteredEvents(data.events);
                setSuggestedEvents(data.events.filter((event) => event.isPromoted !== true));
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
            });
    };
    React.useEffect(() => {
        fetchData();
    }, []);


    function updateFilters(filter: { name: string, value: any }) {
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

    const [failedImages, setFailedImages] = useState([]);
    const handleImageError = (eventId) => {
        console.log('errorimage')
        console.log('errorid', eventId)
        setFailedImages(prevFailedImages => [...prevFailedImages, eventId]);
    };


    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
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
                                    uri: "https://logohistory.net/wp-content/uploads/2023/07/Metallica-Logo.png",
                                }}
                            />
                            <Text style={styles.cardTitle}>Metallica</Text>
                        </View>
                        <View style={styles.card}>
                            <Image
                                style={styles.cardImage}
                                source={{
                                    uri: "https://i.ytimg.com/vi/tH6me6_JHK4/maxresdefault.jpg",
                                }}
                            />
                            <Text style={styles.cardTitle}>Dżem</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
            <View style={styles.searchBar}>
                <MainSearchBar updateFilters={updateFilters}/>
            </View>

            <ScrollView style={styles.eventsScroll}>
                <View style={styles.eventsContainer}>
                    {filteredEvents.map((event: any) => {
                        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
                        const isValidUrl = urlPattern.test(event.image);
                        console.log(isValidUrl)
                        return (
                            <TouchableOpacity
                                key={event._id}
                                style={styles.stripe}
                                onPress={() =>
                                    navigation.navigate("EventDetails", {eventId: event._id})
                                }
                            >
                                {!failedImages.includes(event._id) && isValidUrl ? (
                                    <Image
                                        defaultSource={{
                                            uri: def
                                        }}
                                        style={styles.stripeImage}
                                        source={{
                                            uri: event.image,
                                        }}
                                        onError={() => handleImageError(event._id)}
                                    />) : (
                                    <Image
                                        style={styles.stripeImage}
                                        source={{uri: `https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=`}}

                                    />)}
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
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate("AddEventScreen")
                }
                style={styles.addEventButton}
            >
                <Image
                    style={styles.plusIcon}
                    source={require("../assets/plus_circle.png")}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    addEventButton: {
        position: "absolute",
        bottom: 65,
        left: 170,
        zIndex: 10,
        elevation: 10,
    },
    plusIcon: {
        width: 50,
        height: 50,
        zIndex: 999,
        elevation: 999,
    },
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
    eventsScroll: {
        paddingTop: 10,
        height: 80,
        width: 380,

    },
    eventsContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 100,
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
        marginRight: 2
    },
    scrollView: {
        height: 130,
    },
    cardsContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: 5
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
