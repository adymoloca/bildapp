/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, PermissionsAndroid, Platform, View} from 'react-native';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import NavigationStack from './src/containers/navigation';
import GlobalLtrStyle from './src/themes/styles/global.ltr.style';
import {PersistGate} from 'redux-persist/integration/react';
import {PERMISSIONS, request} from 'react-native-permissions';
import Toast from 'react-native-simple-toast';
import {GOOGLE_MAPS_API_KEY} from './src/utils/config';
import Geocoder from 'react-native-geocoding';
import I18n from 'i18n-js';

Geocoder.init(GOOGLE_MAPS_API_KEY, {
  language: I18n.locale,
  country: 'RO',
});
const App = () => {
  const isDarkMode = false;
  const backgroundStyle = isDarkMode
    ? GlobalLtrStyle.darkFlexView
    : GlobalLtrStyle.flexView;
  const askForLocationIOS = async () => {
    request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
      console.log('PERMISSIONS.IOS.LOCATION_WHEN_IN_USE result', result);
    });
  };
  const askForPermissions = async () => {
    let granted_fine_location = await PermissionsAndroid.check(
      'android.permission.ACCESS_FINE_LOCATION',
    );
    let granted_coarse_location = await PermissionsAndroid.check(
      'android.permission.ACCESS_COARSE_LOCATION',
    );

    if (!granted_fine_location)
      granted_fine_location =
        'granted' ===
        (await PermissionsAndroid.request(
          'android.permission.ACCESS_FINE_LOCATION',
        ));

    if (!granted_coarse_location)
      granted_coarse_location =
        'granted' ===
        (await PermissionsAndroid.request(
          'android.permission.ACCESS_COARSE_LOCATION',
        ));

    if (!granted_fine_location || !granted_coarse_location) {
      Toast.show(
        'Not all permissions given. App might run with errors!',
        Toast.LONG,
      );
    }

    // if (granted_fine_location && granted_coarse_location) setShowMap(true);

    // forceUpdate();
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      askForPermissions();
    } else {
      askForLocationIOS();
    }
  }, []);
  return (
    <>
      <View style={backgroundStyle}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <NavigationStack />
          </PersistGate>
        </Provider>
      </View>
    </>
  );
};

export default App;
