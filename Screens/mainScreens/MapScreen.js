import React from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";

const MapScreen = ({ route }) => {
  const { latitude = 50.1276217, longitude = 34.8839722 } =
    route.params.location;
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
