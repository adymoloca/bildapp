import React, {useEffect} from 'react';
import {Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomIcon from '../../../atoms/CustomIcon';
import i18n from '../../../services/i18n';
import {Colors, Fonts} from '../../../themes';
import GlobalLtrStyle from '../../../themes/styles/global.ltr.style';
import styles from '../styles';

export const Notes = ({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) => {
  let observationsRef = React.useRef<TextInput>(null);
  return (
    <TouchableOpacity style={styles.inputItem}>
      <View style={[styles.inputItemLeft, {alignSelf: 'flex-start'}]}>
        <CustomIcon
          size={Fonts.h3}
          color={Colors.black}
          iconPack="custom"
          name="notes"
        />
      </View>
      <View style={styles.inputItemRightNoSeparator}>
        <TextInput
          ref={observationsRef}
          editable={!disabled}
          value={value}
          placeholder={`${i18n.t('notes')}`}
          onChangeText={value => {
            if (value.length < 250) {
              onChange(value);
            }
          }}
          multiline={true}
          onBlur={() => {
            onChange(value?.trim());
          }}
          numberOfLines={Platform.OS === 'ios' ? 12 : undefined}
          onSubmitEditing={() => {
            observationsRef?.current?.blur();
          }}
          returnKeyType={'done'}
          style={[
            GlobalLtrStyle.regularBlackText,
            {color: Colors.greyIrina, width: '100%'},
            Platform.OS === 'android' ? {maxHeight: 200} : {},
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};
