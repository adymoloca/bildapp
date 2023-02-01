import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import i18n from "../../../services/i18n";
import { Colors, Fonts } from "../../../themes";

const NoSupplierFound = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Icon
        color={Colors.yellow}
        name={'warning'}
        size={Fonts.h5}
        // onPress={toggleAllSelections}
        style={{paddingLeft: 5}}
      />
      <Text
        style={{
          color: Colors.black,
          padding: 15,
          paddingLeft: 5,
          fontSize: Fonts.regular,
        }}>
        {i18n.t('no_supplier_in_range')}
      </Text>
    </View>
  );
};

export default NoSupplierFound
