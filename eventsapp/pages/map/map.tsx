import * as React from "react";
import {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {useSelector} from "react-redux";
import MapView, {Marker} from "react-native-maps";
import * as Location from "expo-location";
import {BASE_URL} from "../../constants";
import MainSearchBar from "../../components/mainSearchBar";
import {getEvents} from "../../services/eventsService";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export default function MapScreen() {
    const [pins, setPins] = React.useState([]);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [filteredPins, setFilteredPins] = React.useState([]);
    const token = useSelector((state: any) => state.user.token);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [filters, setFilters] = useState([
            {name: 'genre', value: ''},
            {name: 'city', value: ''},
            {name: 'name', value: ''},
        ]
    );
    const getPinColor = (eventType) => {
        switch (eventType) {
            case 'Sport':
                return 'green'; // Set your desired color for sport type
            case 'Concert':
                return 'gold'; // Set your desired color for concert type
            default:
                return 'red'; // Set your default color
        }
    };

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();

        const fetchData = async () => {
            getEvents(token)
                .then((data) => {
                    setPins(data.events);
                    setFilteredPins(data.events)
                })
                .catch((error) => {
                    console.error("Error fetching events:", error);
                });
        };
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
        let pinsToFilter = pins;
        const name = filters.find((e) => e.name === 'name')
        const genre = filters.find((e) => e.name === 'genre')
        const city = filters.find((e) => e.name === 'city')

        if (genre.value && genre.value != "") {
            pinsToFilter = pinsToFilter.filter((e) => e.type === genre.value);
        }

        if (name.value && name.value != "") {
            pinsToFilter = pinsToFilter.filter((e) => e.name.includes(name.value));
        }

        if (city.value && city.value != "") {
            pinsToFilter = pinsToFilter.filter((e) => e.city === city.value);
        }

        setFilteredPins(pinsToFilter)
    }


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
                    top: 10,
                }}
            >
                <View style={styles.searchBar}>
                    <MainSearchBar updateFilters={updateFilters}/>
                </View>
            </View>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location ? location.coords.latitude : 52.9189046,
                    longitude: location ? location.coords.longitude : 22.1343786,
                    latitudeDelta: 12.0922,
                    longitudeDelta: 12.0421,
                }}
            >
                {filteredPins.map((pin) => {
                    return (
                        <Marker
                            key={pin._id}
                            coordinate={{
                                latitude: pin.latitude,
                                longitude: pin.longitude,
                            }}
                            title={pin.name}
                            description={pin.type}
                            pinColor={getPinColor(pin.type)}
                            onCalloutPress={()=>navigation.navigate("EventDetails", {eventId: pin._id})}
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
    }, searchBar: {
        marginTop: 10
    }

});
