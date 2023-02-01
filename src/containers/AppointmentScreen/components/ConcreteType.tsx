import React, {useEffect} from 'react';
import {Platform, Text, View} from 'react-native';
import CustomIcon from '../../../atoms/CustomIcon';
import i18n from '../../../services/i18n';
import {Colors, Fonts} from '../../../themes';
import styles, {pickerStyle} from '../styles';
import RNPickerSelect, {Item} from 'react-native-picker-select';
import GlobalLtrStyle from '../../../themes/styles/global.ltr.style';

export const ConcreteType = ({
  value,
  onChange,
  extraTextStyle,
}: {
  value: string;
  onChange: (value: string) => void;
  extraTextStyle?: {[key: string]: any};
}) => {
  const [concreteList, setConcreteList] = React.useState<Item[]>([]);
  const [selectedConcrete, setSelectedConcrete] = React.useState<string>(value);
  useEffect(() => {
    const result = [];
    for (let i = 1; i < 4; i++) {
      result.push({
        value: i + '',
        label: i18n.t('concrete_type_' + i),
      });
    }
    setConcreteList(result);
  }, []);

  const onValueChange = (value: string) => {
    if (Platform.OS === 'android') { 
      onChange(value);
      return;
    }
    if (value) {
      setSelectedConcrete(value);
    } else if (concreteList[0]) {
      setSelectedConcrete(concreteList[0].value);
    }
  };
  return (
    <>
      <RNPickerSelect
        useNativeAndroidPickerStyle={false}
        value={selectedConcrete}
        onValueChange={onValueChange}
        items={concreteList}
        onDonePress={() => onChange(selectedConcrete)}
        style={pickerStyle}>
        <View style={styles.inputItem}>
          <View style={[styles.inputItemLeft, {paddingLeft: 5}]}>
            <CustomIcon
              size={Fonts.h3}
              color={Colors.black}
              disabled
              iconPack="custom"
              name="quantity"
            />
          </View>
          <View style={styles.inputItemRight}>
            <Text
              style={[
                GlobalLtrStyle.regularBlackText,
                !value ? extraTextStyle : {},
              ]}>
              {value
                ? i18n.t('concrete_type_' + value)
                : i18n.t('concrete_type')}
            </Text>
            <CustomIcon
              size={Fonts.h5}
              color={'#CFD0D4'}
              disabled
              name="chevron-forward-sharp"
            />
          </View>
        </View>
      </RNPickerSelect>
    </>
  );
};
