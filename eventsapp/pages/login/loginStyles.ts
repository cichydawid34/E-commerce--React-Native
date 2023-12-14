
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    formContainer: {
        width: 300,
        alignItems: "center",
        justifyContent: "center",
    },
    textHeader: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },
    textLink: {
        marginTop: 10,
        fontSize: 14,
        color: "#0080ff",
        textDecorationLine: "underline",
    },
    input: {
        height: 50,
        width: 300,
        margin: 10,
        paddingLeft: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#ccc",
        fontSize: 16,
    },
    invalidInput: {
        borderColor: "red",
    },
    image: {
        width: 270,
        height: 270,
    },
    loginButton: {
        borderColor: "red",
        borderWidth: 2,
        padding: 7,
        paddingHorizontal: 56,
        textAlign: "center",
        backgroundColor: "indianred",
        borderRadius: 4,
        marginTop: 10,
    },
    textButton: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    errorMessage: {
        color: "red",
        textAlign: "right",
        marginLeft: "auto",
    },
});
