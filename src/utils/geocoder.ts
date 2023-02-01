import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
export const getCurrentLocation = (): Promise<{ address: string, coordinates: { lat: number, lng: number } }> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        Geocoder.from({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
          .then(response => {
            const address = response.results[0].formatted_address;
            const city = response.results[0].address_components[2].long_name;
            resolve({
              address: `${address}, ${city}`,
              coordinates: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            });
          })
          .catch(error => { console.warn(error); reject(error); });
      },
      error => {
        console.warn(error); reject(error);
      },
    );
  });
};