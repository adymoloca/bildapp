import React, {useEffect} from 'react';
import {Switch, Text, View} from 'react-native';
import styles, {pickerStyle} from '../styles';
import GlobalLtrStyle from '../../../themes/styles/global.ltr.style';
import {Colors} from '../../../themes';
import RNPickerSelect, {Item} from 'react-native-picker-select';
import i18n from '../../../services/i18n';
import {ITimeInterval} from '../../../utils/interfaces';
import {hourOptions} from '../../../utils/dateUtils';

export const AppointmentTimePicker = ({
  value,
  onChange,
  disabled,
  disableAllDay,
  selectedDate,
}: {
  value: ITimeInterval;
  onChange: (value: ITimeInterval) => void;
  disabled?: boolean;
  selectedDate?: Date | string;
  disableAllDay?: boolean;
}) => {
  const [isAnyTimeSelected, setIsAnyTimeSelected] = React.useState(false);
  const [oldValue, setOldValue] = React.useState<ITimeInterval>(value);

  const switchIsAnyTimeSelected = () => {
    if (!isAnyTimeSelected) {
      setOldValue(value);
      onChange({start: 0, end: 24});
    } else {
      onChange(oldValue);
    }
    setIsAnyTimeSelected(!isAnyTimeSelected);
  };

  useEffect(() => {
    if (value.start === 0 && value.end === 24 && !disableAllDay) {
      setIsAnyTimeSelected(true);
    } else {
      setIsAnyTimeSelected(false);
    }
  }, [value]);

  return (
    <>
      {!disableAllDay && (
        <View style={styles.inputItem}>
          <View style={styles.inputItemLeft} />

          <View style={styles.inputItemRight}>
            <Text style={GlobalLtrStyle.regularBlackText}>
              {i18n.t('all_day')}
            </Text>
            <Switch
              trackColor={{
                false: Colors.darkGrey,
                true: Colors.green,
              }}
              disabled={disabled}
              thumbColor={Colors.white}
              value={isAnyTimeSelected}
              onValueChange={switchIsAnyTimeSelected}
            />
          </View>
        </View>
      )}

      {!isAnyTimeSelected && (
        <>
          <TimePicker
            disabled={disabled}
            items={hourOptions(null, value.end, selectedDate)}
            label="from"
            onChange={v => {
              onChange({start: v, end: value.end});
            }}
            value={value.start}
          />
          <TimePicker
            disabled={disabled}
            items={hourOptions(value.start, null, selectedDate)}
            label="to"
            onChange={v => {
              onChange({start: value.start, end: v});
            }}
            value={value.end}
          />
        </>
      )}
    </>
  );
};

export const TimePicker = ({
  label,
  value,
  onChange,
  items,
  disabled,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  items: Item[];
  disabled?: boolean;
}) => {
  return (
    <View style={styles.inputItem}>
      <View style={styles.inputItemLeft} />
      <View style={styles.inputItemRight}>
        <Text style={GlobalLtrStyle.regularBlackText}>{i18n.t(label)}</Text>
        <RNPickerSelect
          disabled={disabled}
          useNativeAndroidPickerStyle={false}
          value={value}
          onValueChange={value => onChange(value)}
          items={items}
          style={pickerStyle}
        />
      </View>
    </View>
  );
};
