import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import { MapView, Location, Permissions } from 'expo';

const Marker = MapView.Marker;

export default class Map extends Component {
    state = {
        location: null,
    }

    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if(status !== 'granted') {
            this.setState({
                errorMessage: 'El permiso para acceder a localización fue denegado'
            });
        }

        let location = await Location.getCurrentPositionAsync({});

        let miCole = (await Location.geocodeAsync("Avenida 28 de Julio 249"))[0];
        this.setState({ location, places: {
            miCole,
        }});
    }

    componentDidMount() {
        this.getLocationAsync();
    }

    render() {
        if(!this.state.location){
            return(<View />)
        } else {
            return (
                <SafeAreaView>
                    <MapView
                        style = { styles.container }
                        provider = { MapView.PROVIDER_GOOGLE }
                        initialRegion = {{
                            latitude: this.state.location.coords.latitude,
                            longitude: this.state.location.coords.longitude,
                            latitudeDelta: 0.0922/ 2.5, 
                            longitudeDelta: 0.0421/ 2.5
                        }}
                        showsUserLocation
                        showsMyLocationButton
                    >
                        <Marker coordinate = { this.state.location.coords } title = "Te encuentras Aquí" />
                        <Marker
                            coordinate={this.state.places.miCole}
                            title="María Alvarado"
                            description="Mi cole"
                            pinColor="blue"
                        />
                    </MapView>
                </SafeAreaView>
            )
        }
    }
}
const styles = {
    container: {
        width: '100%',
        height: '100%'
    }
}