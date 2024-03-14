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
import MapView, {Marker} from "react-native-maps";
import {useSelector} from "react-redux";
import {BASE_URL} from "../../constants";
import {useEffect} from "react";
import {deleteEventService} from "../../services/eventsService";
import Toast from "react-native-toast-message";

export default function EventDetails({route, navigation}) {
    const [event, setEvent] = React.useState(null);
    const {eventId} = route.params;
    const token = useSelector((state: any) => state.user.token);
    const [isInFavorites, setIsInFavorites] = React.useState(false);

    React.useEffect(() => {
        const clearAsyncStorage = async () => {
            //AsyncStorage.clear();
        }
        const fetchData = async () => {
            try {
                clearAsyncStorage()
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
                if(data.event) {
                    checkFavorite();
                }
            } catch (error) {
                console.error("Error fetching event:", error);
            }

        };
        fetchData();

    }, []);

    useEffect(() => {
        checkFavorite()
    }, [event]);
    async function checkFavorite() {

        const favorites = await AsyncStorage.getItem("FAVORITES");
        let isFav = false;
        const array = JSON.parse(favorites);
        console.log('ulubione', array)
        if (array && array?.length != 0) {
            console.log('ulubione2', array)
            array.map((x) => {
                console.log('ulubion', x)
                console.log('event',event)
                if (x._id == event._id) {
                    console.log('tru')
                    isFav = true;
                }
            });
            setIsInFavorites(isFav);
            console.log('isFavv return', isFav)
            return isFav;
        }
        console.log('isFavv return', isFav)
        setIsInFavorites(isFav);
        return isFav;
    }
    async function deleteEvent(){
    try{
       await deleteEventService(event._id)
        Toast.show({
            type: "success",
            text1: "Success",
            text2: "You have successfully deleted an event",
        });
    }
    catch(e){
    }
    }

    async function addToFavorites() {
        if (!isInFavorites) {
            const favorites = await AsyncStorage.getItem("FAVORITES");
            let array = JSON.parse(favorites) || [];

            array.push(event);

            await AsyncStorage.setItem("FAVORITES", JSON.stringify(array));
            checkFavorite();
        } else {
            const favorites = await AsyncStorage.getItem("FAVORITES");
            let array = JSON.parse(favorites) || [];
            // Filter the array based on the condition
            let returnArray=[]
            returnArray= array.filter((e) => e._id !== event._id);

            console.log('Original Array:', array);
            console.log('Filtered Array:', returnArray);

            // Update AsyncStorage with the modified array
            await AsyncStorage.setItem("FAVORITES", JSON.stringify(returnArray));
            checkFavorite();
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
        <View style={{flex: 1, alignItems: "center",justifyContent:'center'}}>
            <ScrollView
                style={styles.main}
            >
                <Image
                    style={styles.image}
                    source={{
                        uri: event.image,
                    }}
                />
                <>
                    <Text style={styles.header}>{event.name}</Text>
                    <View style={[{display:'flex',flexDirection:'row'}]}>
                    <Pressable  onPress={deleteEvent} style={[{marginBottom:10}]}>
                    <Image
                        style={[{height:40,width:40,marginLeft:155}]}
                        source={
                             require("../../assets/deleteIcon.png")
                        }

                    />
                    </Pressable>
                    <Pressable  onPress={() =>
                        navigation.navigate("AddEventScreen", {event: event,})
                    } >
                        <Image
                            style={[{height:40,width:40,marginLeft:10}]}
                            source={
                                require("../../assets/editIcon.png")
                            }

                        />
                    </Pressable>
                    </View>

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

                    <Text style={styles.headerDes}>About</Text>
                    <Text style={styles.description}>{event.description}</Text>
                    <Text style={styles.dateEvent}>{event.city} {event.street}</Text>

                    <Pressable style={styles.button} onPress={addToFavorites}>
                        {!isInFavorites ? (
                            <Text style={styles.text}>Add to Favorites </Text>
                        ) : (
                            <Text style={styles.text}>Remove from Favorites</Text>
                        )}
                    </Pressable>
                </>
            </ScrollView>
            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    main: {
        flex: 1,
        display: "flex",
        width: 440,
        paddingHorizontal: 20,

    },
    mapContainer: {
        width: "95%",
        height: 150,
        borderRadius: 40,
        overflow: "hidden",
        marginLeft:10

    },
    map: {
        height: 150,
        marginHorizontal:0,
        marginLeft:0,

    },
    image: {
        height: 160,
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
        fontSize: 31,
        fontWeight: "bold",
        marginRight: "auto",
        marginTop: 15,
        marginLeft: 135,
        marginBottom: 10,
    },
    headerDes: {
        fontSize: 29,
        fontWeight: "bold",
        marginRight: "auto",
        marginTop: 10,
        marginLeft: 'auto',
        marginBottom: 2,
    },
    description: {
        color: "#4949494",
        width: "90%",
        marginBottom: 12,
        fontSize: 14,
        marginLeft:20,
        // borderColor:'black',
        // borderWidth:1,
        padding:17,
        backgroundColor:'white',
        borderRadius:40
    },
    dateEvent: {
        backgroundColor: "indianred",
        color: "white",
        padding: 2,
        fontSize: 16,
        marginBottom: 8,
        textAlign:'center'
    },
});
