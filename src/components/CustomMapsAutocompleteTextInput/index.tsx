import _ from 'lodash';
import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import i18n from '../../services/i18n';
import {Colors} from '../../themes';
import GooglePlacesAutocompleteStyle from '../../themes/GooglePlacesAutocompleteStyle';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import {GOOGLE_MAPS_API_KEY} from '../../utils/config';
import {Address, IAddress} from '../../utils/interfaces';

const CustomMapsAutocompleteTextInput = ({
  setValue = () => {},
  onFocus = () => {},
  onBlur = () => {},
  style = {},
  texInputStyle = {},
  icon = null,
  setRef = (ref: any) => {},
  value,
  setAddressObject = () => {},
  addressObject = {},
}: any) => {
  // const ref = useRef();

  // useEffect(() => {
  //   ref?.current?.setAddressText(value);
  // }, [value]);

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}>
      {icon}
      <GooglePlacesAutocomplete
        ref={setRef}
        placeholder="enter address here"
        fetchDetails={true}
        onPress={(data, details) => {
          let addressObjectNew = _.cloneDeep(addressObject);
          details?.address_components.forEach(element => {
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
          addressObjectNew.formattedAddress = data.description;
          addressObjectNew.url = details?.url || 'http://google.com';
          addressObjectNew.location = details?.geometry?.location
          if (
            !addressObjectNew.postalCode ||
            addressObjectNew.postalCode === ''
          ) {
            addressObjectNew.postalCode = '00000';
          }
          setAddressObject(addressObjectNew);
          setValue(data.description);
          onBlur();
        }}
        textInputProps={{
          onFocus: onFocus,
          onBlur: onBlur,
        }}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: i18n.locale,
        }}
        numberOfLines={3}
        styles={{
          ...style,
          textInput: {
            ...GlobalLtrStyle.regularBlackText,
            color: Colors.black,
            ...texInputStyle,
          },
        }}
        getDefaultValue={() => 'Previous Address'}
      />
    </View>
  );
};

export default CustomMapsAutocompleteTextInput;
