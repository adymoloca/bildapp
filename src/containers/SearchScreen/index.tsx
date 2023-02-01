import {useIsFocused, useNavigation} from '@react-navigation/native';
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
} from 'react-native';
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import {useDispatch, useSelector} from 'react-redux';
import ChevronBackward from '../../atoms/SvgIcons/ChevronBackward';
import Search from '../../atoms/SvgIcons/Search';
import {actions} from '../../redux/slices/orderSlice';
import {RootState} from '../../redux/store';
import Colors from '../../themes/Colors';
import Fonts from '../../themes/Fonts';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import {GOOGLE_MAPS_API_KEY} from '../../utils/config';
import Geocoder from 'react-native-geocoding';
import {ClientPathList, SupplierPathList} from '../../utils/enums';
import {
  actions as userActions,
  selectSupplierDetails,
} from '../../redux/slices/userSlice';
import {
  actions as persistedAction,
  selectClientCompanyDetails,
  selectSupplierCompanyDetails,
} from '../../redux/slices/persistedUserSlice';
import {
  Address,
  ClientCompany,
  ISupplierData,
  SupplierCompany,
} from '../../utils/interfaces';
import _ from 'lodash';
import {selectIsClient} from '../../redux/slices/applicationSlice';
import CustomStatusBar from '../../components/CustomStatusBar';

const SearchScreen = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const searchFieldRef = React.useRef<GooglePlacesAutocompleteRef>(null);

  const navigation: any = useNavigation();

  const dispatch = useDispatch();
  const isClient = useSelector(selectIsClient);
  const isFocused = useIsFocused();

  const orderData = useSelector((state: RootState) => state.order.orderData);
  const supplierDetails: ISupplierData = useSelector(selectSupplierDetails);
  const supplierCompanyDetails = useSelector(selectSupplierCompanyDetails);
  const clientCompanyDetails = useSelector(selectClientCompanyDetails);

  useEffect(() => {
    searchFieldRef?.current?.focus();
  }, []);

  useEffect(() => {
    if (!isFocused) {
      setSearchValue('');
    } else {
      searchFieldRef?.current?.focus();
    }
  }, [isFocused]);

  const changeAddress = (value: string, details: GooglePlaceDetail | null) => {
    const routes = navigation.getState()?.routes;
    const prevRoute = routes[routes.length - 2];

    Geocoder.from(value)
      .then(response => {
        const location = response?.results[0]?.geometry?.location;
        const addressObject = details
          ? generateAddressObject(value, details)
          : null;
        if (location) {
          if (
            prevRoute.name === SupplierPathList.APPOINTMENT_DRAFT ||
            prevRoute.name === SupplierPathList.EDIT_ORDER
          ) {
            dispatch(
              actions.setOrderData({
                ...orderData,
                coordinates: location,
                address: value,
              }),
            );
          } else if (
            addressObject &&
            prevRoute.name === SupplierPathList.EDIT_ACCOUNT
          ) {
            dispatch(
              userActions.putUserDetails({
                ...supplierDetails,
                address: addressObject,
              }),
            );
          } else if (
            prevRoute.name === SupplierPathList.INVOICE_DETAILS &&
            addressObject &&
            !isClient
          ) {
            dispatch(
              persistedAction.setSupplierCompanyDetails({
                ...(supplierCompanyDetails || new SupplierCompany()),
                companyAddress: addressObject,
              }),
            );
          } else if (
            prevRoute.name === ClientPathList.INVOICE_DETAILS &&
            addressObject &&
            isClient
          ) {
            dispatch(
              persistedAction.setClientCompanyDetails({
                ...(clientCompanyDetails || new ClientCompany()),
                companyAddress: addressObject,
              }),
            );
          }
          navigation.goBack();
        }
      })
      .catch(e => {
        console.warn(e);
      });
  };

  const generateAddressObject = (
    description: string,
    details: GooglePlaceDetail,
  ) => {
    let addressObjectNew = _.cloneDeep(
      supplierCompanyDetails?.companyAddress || new Address(),
    );
    details?.address_components?.forEach(element => {
      if (element.types.includes('locality')) {
        addressObjectNew.city = element.long_name;
      } else if (element.types.includes('administrative_area_level_2')) {
        addressObjectNew.city = element.long_name;
      } else if (element.types.includes('administrative_area_level_1')) {
        addressObjectNew.state = element.long_name;
      } else if (element.types.includes('country')) {
        addressObjectNew.country = element.long_name;
        addressObjectNew.countryShort = element.short_name;
      } else if (element.types.includes('postal_code')) {
        addressObjectNew.postalCode = element.long_name;
      }
    });
    addressObjectNew.formattedAddress = description;
    addressObjectNew.url = details?.url || 'http://google.com';
    addressObjectNew.location = details?.geometry?.location;
    if (!addressObjectNew.postalCode || addressObjectNew.postalCode === '') {
      addressObjectNew.postalCode = '00000';
    }

    return addressObjectNew;
  };

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
        fetchDetails={true}
        onPress={(data, details) => {
          const addressString = data.description;
          changeAddress(addressString, details);
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
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={10}>
      <CustomStatusBar />

      <SafeAreaView>
        {isFocused && (
          <View style={StyleSearchModal.bodyContainer}>{searchHeader}</View>
        )}
      </SafeAreaView>
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

export default SearchScreen;
