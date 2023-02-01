import React from 'react';
import {Switch, Text, View} from 'react-native';
import i18n from '../../../services/i18n';
import {Colors, Fonts} from '../../../themes';
import GlobalLtrStyle from '../../../themes/styles/global.ltr.style';
import styles from '../styles';

export const PumpingService = ({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
}) => {
  return (
    <>
      <View style={styles.inputItem}>
        <View style={styles.inputItemLeft} />
        <View style={styles.inputItemRight}>
          <Text style={GlobalLtrStyle.regularBlackText}>
            {i18n.t('pumping_services')}
          </Text>
          <Switch
            trackColor={{
              false: Colors.greyIrina,
              true: Colors.green,
            }}
            thumbColor={Colors.white}
            value={value}
            onValueChange={v => {
              onChange(v);
            }}
          />
        </View>
      </View>
    </>
  );
};
