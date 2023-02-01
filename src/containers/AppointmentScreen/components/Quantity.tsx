import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import i18n from '../../../services/i18n';
import GlobalLtrStyle from '../../../themes/styles/global.ltr.style';
import styles from '../styles';

export const Quantity = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const quantityRef = React.createRef<TextInput>();
  const onFocusQuantityRef = () => {
    quantityRef?.current?.focus();
  };

  const changeQuantity = (text: string) => {
    const number = parseInt(text);
    if (number === 0) {
      return;
    }
    const parsedToNumber = text.replace(/[^0-9]/g, '');
    onChange(parsedToNumber);
  };
  return (
    <TouchableOpacity onPress={onFocusQuantityRef} style={styles.inputItem}>
      <View style={styles.inputItemLeft} />
      <View style={styles.inputItemRight}>
        <Text style={GlobalLtrStyle.regularBlackText}>
          {i18n.t('quantity')}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            keyboardType="numeric"
            value={value}
            ref={quantityRef}
            onChangeText={changeQuantity}
            style={GlobalLtrStyle.regularBlackText}
            returnKeyType={'done'}
          />
          <Text style={[GlobalLtrStyle.regularBlackText, {paddingLeft: 5}]}>
            {value.length ? 'm³' : ''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
