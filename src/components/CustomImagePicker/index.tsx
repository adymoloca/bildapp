import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomIcon from '../../atoms/CustomIcon';
import { Colors, Fonts, Metrics } from '../../themes';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import MyAccountScreenStyle from '../../themes/styles/myAccountScreen.ltr.style';
import { launchImageLibrary } from 'react-native-image-picker'
import * as ImagePicker from "react-native-image-picker"


const CustomImagePicker = ({
  label,
  value,
  right,
  disabled,
  setValue = () => {},
}: any) => {
  const handlePicker = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose file from Custom Option'
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    // console.log('edit');
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setValue(response.assets[0])
      }
    });
  };

  return (
    <TouchableOpacity
      disabled={right === null || disabled}
      onPress={() => {handlePicker()}}
    >
      <View style={{ paddingTop: 20 }}>
        <Text style={[GlobalLtrStyle.formTextPlaceholder, { fontSize: 14, paddingLeft: 0 }]}>{label}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: Colors.greyOpacity, borderBottomWidth: 1 }}>
        <View
          style={[
            style.textImagePicker
          ]}>
          <Text numberOfLines={1} style={[GlobalLtrStyle.regularBlackText, {width:'80%'}]}>
            {value.fileName}
          </Text>
          <CustomIcon
            size={Fonts.h5}
            color={Colors.blackOpacity2}
            name={'camera'}
          />
          </View>
        </View>
      </View>
    </TouchableOpacity >
  );
};


const style = {
  textImagePicker: {
    flex: 1,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInputContainer: {},

  poweredContainer: {},
  listView: {
    pointerEvents: 'auto',
    // width: '80%',
    backgroundColor: 'white',
    zIndex: 10,
  },
  row: {
    zIndex: 10,
    pointerEvents: 'auto',
  },
};

export default CustomImagePicker;
