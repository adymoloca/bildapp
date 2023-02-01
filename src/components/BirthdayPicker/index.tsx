import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import CustomIcon from '../../atoms/CustomIcon';
import {Colors, Fonts, Metrics} from '../../themes';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import MyAccountScreenStyle from '../../themes/styles/myAccountScreen.ltr.style';
import {launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';

const BirthdayPicker = ({
  label,
  value,
  stringValue,
  setValue = () => {},
}: any) => {
  const [open, setOpen] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setOpen(true);
      }}>
      <View style={{paddingTop: 20}}>
        <Text
          style={[
            GlobalLtrStyle.formTextPlaceholder,
            {fontSize: 14, paddingLeft: 0},
          ]}>
          {label}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: Colors.greyOpacity,
            borderBottomWidth: 1,
          }}>
          <View style={[style.textBirthdayPicker]}>
            <Text
              numberOfLines={1}
              style={[GlobalLtrStyle.regularBlackText, {width: '80%'}]}>
              {stringValue}
            </Text>
            <DatePicker
              modal
              open={open}
              date={value}
              onConfirm={date => {
                setOpen(false);
                setValue(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
              mode="date"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity> 
  );
};

const style = {
  textBirthdayPicker: {
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

export default BirthdayPicker;
