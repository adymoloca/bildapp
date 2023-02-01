import {View, Text, TouchableOpacity, Switch} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts} from '../../themes';
import CustomIcon from '../../atoms/CustomIcon';
import {ISupplierSettingsOptions} from '../../utils/interfaces';

export default function SupplierAccountListItem({
  data,
}: {
  data: ISupplierSettingsOptions;
}) {

  return (
    <TouchableOpacity
      disabled={data.disabled}
      onPress={data.callback}
      style={{
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGrey,
      }}>
      <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
        {data.isCentered ? (
          <View style={{height: 40}} />
        ) : (
          <View
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomIcon
              style={{marginLeft: 2}}
              size={Fonts.h6}
              color={Colors.black}
              name={data.icon}
              onPress={data.callback}
              iconPack='custom'
            />
          </View>
        )}
        <View style={{flex: 1, paddingLeft: 10, justifyContent: 'center'}}>
          <View
            style={[
              {flexDirection: 'row', justifyContent: 'space-between'},
              {justifyContent: data.isCentered ? 'center' : 'flex-start'},
            ]}>
            <Text
              style={[
                {fontWeight: '300', fontSize: Fonts.medium, color: 'black'},
              ]}>{`${data.title}`}</Text>
          </View>
          <View></View>
        </View>
        {(!!data.notificationNumber && data.notificationNumber > 0) && (
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
              {data.notificationNumber}
            </Text>
          </View>
        )}
        {data.isCentered || data.hasSwitch ? (
          <>
            {data.hasSwitch ? (
              <Switch
                trackColor={{
                  false: Colors.darkGrey,
                  true: Colors.green,
                }}
                thumbColor={Colors.white}
                value={data.disabled}
                onValueChange={() => {data.callback && data.callback()}}
              />
            ) : (
              <></>
            )}
          </>
        ) : (
          <CustomIcon
            style={{color: Colors.greyIrina, marginRight: 5}}
            color={Colors.greyRating}
            size={Fonts.h5}
            name={'chevron-right'}
            iconPack='custom'
            onPress={data.callback}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
