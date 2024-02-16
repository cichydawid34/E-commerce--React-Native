import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Button} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {addEventService} from "../../services/eventsService";
import Toast from "react-native-toast-message";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddEventScreen() {

    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventType, setEventType] = useState('Concert');
    const [eventDescription, setEventDescription] = useState('');
    const [eventLocation, setEventLocation] = useState<any>({});
    const [eventImage, setEventImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };
    const addEvent=async()=>{
        console.log('loc',eventLocation)
        console.log('loccity',eventLocation.address_components)
        console.log('date',eventDate)
        const newEvent ={
            name:eventName,
            type:eventType,
            description:eventDescription,
            latitude:eventLocation.geometry.location.lat,
            longitude:eventLocation.geometry.location.lng,
            city:eventLocation.vicinity,
            street:eventLocation.name,
            date:eventDate
        }
        console.log(newEvent)
        try {
            await addEventService("test", newEvent).then(()=>{
                Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: "You have successfully created an event",
                });
            })
        }
        catch(error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: `There was error creating an event `,
            });
        }
    }

    const ref = useRef();

    useEffect(() => {
        // @ts-ignore
        ref.current?.setAddressText('Some Text');
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.border}>
            <Text style={styles.heading}>Add Event</Text>
            <View style={styles.fieldContainer}>
                <Text style={styles.label} aria-label="Label for Username">Event Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Event Name"
                    value={eventName}
                    onChangeText={(text) => setEventName(text)}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={styles.inputDescription}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Type Description"
                    value={eventDescription}
                    onChangeText={(text) => setEventDescription(text)}
                />
            </View>

            <View style={styles.locationContainer}>
                <Text style={styles.label}>Location</Text>
            <GooglePlacesAutocomplete
                styles={{
                    textInputContainer: {
                        width:320,
                        height: 20,
                    },
                    textInput: {
                        width:300,
                        color: '#5d5d5d',
                        fontSize: 16,
                        backgroundColor:"#F5F5F5",
                        borderStyle:'solid',
                        borderColor: '#a6a6a6',
                        borderWidth:1,

                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                    listView: {
                        position: 'absolute',
                        height:150,
                        top: 40,
                        left: 5,
                        right: 5,
                        backgroundColor: 'white',
                        borderRadius: 5,
                        flex: 1,
                        elevation: 3,
                        zIndex: 10

                    },
                }}
                placeholder='Search'
                onPress={(data, details ) => {
                    console.log("test");
                    console.log('data',data, 'details',details);
                    setEventLocation(details)

                }}
                fetchDetails={true}
                query={{
                    key: 'AIzaSyDeZlHAHX3GfgKkPy1LwGLXVNXq8Mo43Yw',
                    language: 'en',
                }}
            />
            </View>


            <View style={[styles.fieldContainer, { marginTop: 25 }]}>
                <Text style={styles.label} aria-label="Label for Username">Image URL</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Event Image URL"
                    value={eventImage}
                    onChangeText={(text) => setEventImage(text)}
                />
            </View>
                <View style={[styles.fieldContainer]}>
            <Text style={styles.label} aria-label="Label for Username">Date</Text>
            <Text> {date.toLocaleString()}</Text>
            <Button  onPress={showDatepicker} title="Show date picker!"  />
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}

                    is24Hour={true}
                    onChange={onChange}
                />
            )}
                </View>
            <View style={[styles.fieldContainer, { marginTop: 15 }]}>
                <Text style={styles.label}>Type</Text>

                <Picker
                    selectedValue={eventType}
                    style={styles.picker}
                    onValueChange={(itemValue) => setEventType(itemValue)}
                >
                    <Picker.Item label="Concert" value="Concert"/>
                    <Picker.Item label="Sport" value="Sport"/>
                </Picker>
            </View>

            <TouchableOpacity
                style={[styles.button]}
               onPress={addEvent}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="white"/>
                ) : (
                    <Text style={styles.textButton} >Add Event</Text>
                )}
            </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    border:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white',
        borderRadius:40,
        padding: 15,
        paddingTop:5
    },
    locationInput:{
        width:400
    },
    locationContainer:{
        maxHeight:250,
        height:50,
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
    },
    fieldContainer: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        gap: 8
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: '#a6a6a6',
        backgroundColor:'#F5F5F5',
        borderWidth:1,
        marginBottom: 16,
        borderRadius: 5,
        padding: 9,
        width: '130%',
    },
    picker:{
        height: 40,
        backgroundColor:'#F5F5F5',
        borderColor: '#a6a6a6',
        borderWidth: 1,
        marginBottom: 16,
        borderRadius: 8,
        padding: 8,
        width: '100%',
    },
    inputDescription: {
        backgroundColor:'#F5F5F5',
        height: 85,
        borderColor: '#a6a6a6',
        borderWidth: 1,
        marginBottom: 16,
        borderRadius: 8,
        padding: 2,
        textAlign:"left",
        textAlignVertical:"top",
        width: '130%',
    },
    button: {
        borderColor: "red",
        borderWidth: 2,
        padding: 7,
        width:330,
        textAlignVertical:"center",
        textAlign: "center",
        backgroundColor: "indianred",
        borderRadius: 4,
        marginTop: 10,
    },
    textButton: {
        textAlign:"center",
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
    },
})

