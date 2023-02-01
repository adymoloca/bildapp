import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import CustomIcon from '../../atoms/CustomIcon';
import {Colors, Fonts} from '../../themes';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import MyAccountScreenStyle from '../../themes/styles/myAccountScreen.ltr.style';

const GeneralField = ({
  icon,
  text,
  value,
  setValue,
  right,
  keyboardType,
  hideSeparator,
  customTextInput,
  disabled,
  onFocus = () => {},
  onBlur = () => {},
  setAddressObject = () => {},
  addressObject,
  isEditable = true,
  notification = false,
  isPhoneInput = false,
}: any) => {

  return (
    <TouchableOpacity
      disabled={right === null || disabled}
      onPress={right && right.callback}
      style={MyAccountScreenStyle.generalFieldContainer}>
      <View style={MyAccountScreenStyle.generalFieldView}>
        <CustomIcon
          style={{marginRight: 15}}
          size={Fonts.h5}
          color={Colors.black}
          name={icon}
          iconPack={"custom"}
          onPress={right && right.callback}
        />
        {isEditable ? (
          <>
            <TextInput
              style={[
                GlobalLtrStyle.regularBlackText,
                {width: '100%', padding: 0, height: '100%'},
              ]}
              value={value}
              onBlur={onBlur}
              onFocus={onFocus}
              keyboardType={keyboardType}
              onChangeText={text => setValue(text)}
            />
          </>
        ) : (
          <Text style={GlobalLtrStyle.regularBlackText}>{text}</Text>
        )}
      </View>
      {right && (
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={right.callback}>
          {notification && (
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                backgroundColor: Colors.redStrong,
                justifyContent: 'center',
                alignItems: 'center',
                marginEnd: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                }}>
                !
              </Text>
            </View>
          )}
          <CustomIcon
            size={Fonts.h5}
            color={Colors.greyIrina}
            name={right.icon}
            onPress={right && right.callback}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default GeneralField;
