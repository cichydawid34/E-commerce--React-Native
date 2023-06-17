# E-vently--React-native 
The Event Finder project is a mobile application that allows users to discover and explore various events happening around their location. The app provides features such as viewing event locations on a map, searching for events based on different criteria, and accessing event details.

## Istallation
To install the project and its dependencies, follow these steps:

Clone the repository:
```
git clone https://github.com/cichydawid34/E-vently--React-native/
Navigate to the project directory:
```
Install the dependencies 
```
cd project-name
npm expo install
```

To run the project on a development server, use the following command:

``` npm expo start```

To test project
```npm test```
## Features:

MapScreen: This screen displays a map view with markers representing different events. It retrieves event data from a server using an HTTP GET request and displays the events on the map. Each marker represents an event and shows the event name and genre when tapped.

Login: This screen provides a login functionality for users to authenticate themselves. Users can enter their email and password, which are validated for correctness. Upon successful login, the user is redirected to the main screen.

Register: This screen provides a register function to create new account.

EventDetails: This screen shows detailed information about a specific event. It retrieves event data from the server using an HTTP GET request based on the provided eventId. The screen displays the event image, name, description, date, location on a map (if available), and other relevant details.

Events Screen: This component is used as the header component in the main screen of the application. It contains features such as a dropdown menu to filter events by genre, a search bar to search for events by name, and a list of suggested events. The component fetches event data from the server using an HTTP GET request and updates the event list based on the selected genre.

## Dependencies:

React Native: A JavaScript framework for building native mobile applications.

Redux: A state management library for JavaScript applications.

React Navigation: A routing and navigation library for React Native applications.

axios: A promise-based HTTP client for making HTTP requests.

react-native-maps: A library for integrating maps into React Native applications.

Toast: A library for displaying toast notifications in React Native applications.

Feel free to explore and modify the project according to your needs.
