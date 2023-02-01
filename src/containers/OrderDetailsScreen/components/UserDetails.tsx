import * as React from 'react';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import CustomIcon from '../../../atoms/CustomIcon';
import {Colors, Fonts} from '../../../themes';
import {IOrder} from '../../../utils/interfaces';

const UserDetails = (props: {order: IOrder; goBack: () => void}) => {
  const {goBack, order} = props;
  return (
    <View
      style={{
        marginBottom: 20,
        marginTop: 20,
      }}>
      <Text
        style={{
          fontSize: Fonts.regular,
          color: Colors.black,
        }}>
        {order.fullName}
      </Text>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(`tel: ${order.phone}`);
        }}
        style={{flexDirection: 'row', marginTop: 5}}>
        <CustomIcon
          size={Fonts.h5}
          color={Colors.green}
          style={{marginTop: 0, marginLeft: 5}}
          name="phone"
          iconPack="custom"
          onPress={() => {
            Linking.openURL(`tel: ${order.phone}`);
          }}
        />
        <Text
          style={{
            fontSize: Fonts.regular,
            fontWeight: 'bold',
            color: Colors.green,
            marginLeft: 5,
          }}>
          {order.phone}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserDetails;
