import {useNavigation} from '@react-navigation/native';
import I18n from 'i18n-js';
import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Keyboard,
} from 'react-native';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChevronBackward from '../../../atoms/SvgIcons/ChevronBackward';
import MapMarker from '../../../atoms/SvgIcons/MapMarker';
import Navigation from '../../../atoms/SvgIcons/Navigation';
import Search from '../../../atoms/SvgIcons/Search';
import {AndroidStyle} from '../../../themes';
import Colors from '../../../themes/Colors';
import Fonts from '../../../themes/Fonts';
import GlobalLtrStyle from '../../../themes/styles/global.ltr.style';
import {GOOGLE_MAPS_API_KEY} from '../../../utils/config';
import {IAddressSearch} from '../../../utils/interfaces';
import MapScreenLtrStyle from '../styles';
interface ISearchModal {
  address: string;
  searchAddress: (address: string, recenter?: boolean) => void;
  city: string;
  setMarker: (data: {
    latitude: null | number;
    longitude: null | number;
  }) => void;
  mapRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  isVisible: boolean;
  onClose: () => void;
  searchList: IAddressSearch[];
  setAddress: (address: string) => void;
  setCity: (city: string) => void;
  useCurrentLocation: () => void;
}
const SearchModal = ({
  searchList,
  setMarker,
  mapRegion,
  onClose,
  setCity,
  setAddress,
  isVisible,
  searchAddress,
  useCurrentLocation,
  address,
  city,
}: ISearchModal) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const searchFieldRef = React.useRef<GooglePlacesAutocompleteRef>(null);
  const navigation: any = useNavigation();
  useEffect(() => {
    if (isVisible) {
      searchFieldRef?.current?.focus();
    } else {
      Keyboard.dismiss();
    }
    if (isVisible && address && city) {
      setSearchValue(`${address}, ${city}`);
      searchFieldRef?.current?.setAddressText(`${address}, ${city}`);
    } else {
      setSearchValue('');
      searchFieldRef?.current?.setAddressText('');
    }
  }, [isVisible]);
  const content = (
    <>
      {!searchValue &&
        searchList.map((search, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setMarker({
                latitude: search.coordinates.lat,
                longitude: search.coordinates.lng,
              });
              setCity(search.city);
              setAddress(search.address);
              onClose();
            }}
            style={MapScreenLtrStyle.historyAddressItem}>
            <Icon size={Fonts.h5} color={Colors.black} name="schedule" />
            <View
              style={{
                flexDirection: 'column',
                marginLeft: 15,
              }}>
              <Text
                style={[GlobalLtrStyle.regularBlackText, {fontWeight: '500'}]}>
                {search.address.length > 28
                  ? search.address.substr(0, 28) + '...'
                  : search.address}
              </Text>
              <Text style={{color: Colors.greyIrina, fontSize: Fonts.medium}}>
                {search.city}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

      <TouchableOpacity
        style={[MapScreenLtrStyle.historyAddressItem, {marginTop: 10}]}
        onPress={() => {
          useCurrentLocation();
          onClose();
        }}>
        <Navigation />
        <View
          style={{
            flexDirection: 'column',
            marginLeft: 15,
          }}>
          <Text
            style={[
              GlobalLtrStyle.regularBlackText,

              {fontWeight: '500', color: Colors.green, fontSize: Fonts.bigger},
            ]}>
            {I18n.t('use_current_location_on_map')}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );

  const searchHeader = (
    <View
      style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
          zIndex: 1000,
          left: 35,
          top: 12,
        }}>
        <Search />
      </View>
      <GooglePlacesAutocomplete
        ref={searchFieldRef}
        placeholder={I18n.t('search_address')}
        onPress={data => {
          const addressString = data.description;
          searchAddress(addressString);
          onClose();
        }}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: I18n.locale,
          // components: 'country:ro',//https://developers.google.com/maps/documentation/places/web-service/autocomplete#maps_http_places_autocomplete_amoeba_strict-js
          // fetchDetails:true
        }}
        renderLeftButton={() => (
          <TouchableOpacity
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: 3,
              width: 30,
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <ChevronBackward />
          </TouchableOpacity>
        )}
        renderRow={(data, i) => {
          return (
            <Text
              style={[GlobalLtrStyle.regularBlackText, {fontWeight: '500'}]}>
              {data.description}
            </Text>
          );
        }}
        numberOfLines={3}
        textInputProps={{
          value: searchValue,
          onChangeText: data => {
            setSearchValue(data);
          },
          editable: true,
          selectTextOnFocus: true,
        }}
        styles={{
          container: {
            width: '100%',
          },
          textInputContainer: {},
          poweredContainer: {
            display: 'none',
          },
          separator: {
            display: 'none',
          },
          textInput: {
            fontSize: Fonts.medium,
            color: Colors.black,
            height: 40,
            borderRadius: 10,
            paddingLeft: 35,
            backgroundColor: Colors.lightGrey2,
          },
        }}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{flex: 1, display: isVisible ? 'flex' : 'none'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={AndroidStyle.AndroidSafeArea}>
        <View style={StyleSearchModal.bodyContainer}>
          {searchHeader}
          <View>{content}</View>
        </View>
      </SafeAreaView>

      <TouchableOpacity
        onPress={() => {
          setMarker({
            latitude: mapRegion.latitude,
            longitude: mapRegion.longitude,
          });
          onClose();
        }}
        style={StyleSearchModal.searchContainer}>
        <MapMarker />

        <Text style={[GlobalLtrStyle.regularBlackText, {marginStart: 10}]}>
          Choose on map
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const StyleSearchModal = StyleSheet.create({
  searchContainer: {
    width: '100%',
    height: 55,
    backgroundColor: Colors.lightGrey3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bodyContainer: {
    height: '90%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
  },
});

export default SearchModal;
