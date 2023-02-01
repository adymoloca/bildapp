import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles';
import GlobalLtrStyle from '../../../themes/styles/global.ltr.style';
import i18n from '../../../services/i18n';
import {Colors, Fonts} from '../../../themes';
import DatePicker from 'react-native-date-picker';
import CustomIcon from '../../../atoms/CustomIcon';

export const AppointmentDatePicker = ({
  value,
  onChange,
  disabled,
}: {
  value: Date;
  disabled?: boolean;
  onChange: (date: Date) => void;
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const onOpenDatePicker = () => {
    setIsDatePickerOpen(true);
  };
  const onCloseDatePicker = () => {
    setIsDatePickerOpen(false);
  };

  const onConfirmDatePicker = (date: Date) => {
    onChange(date);
    onCloseDatePicker();
  };
  return (
    <>
      <TouchableOpacity style={styles.inputItem} disabled={disabled} onPress={onOpenDatePicker}>
        <View style={styles.inputItemLeft}>
          <CustomIcon
            size={Fonts.h5}
            color={Colors.black}
            style={styles.inputIcon}
            name="edit-calendar"
            iconPack='custom'
          />
        </View>
        <View style={styles.inputItemRight}>
          <Text style={GlobalLtrStyle.regularBlackText}>
            {new Date(value).toLocaleDateString(i18n.locale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>
      </TouchableOpacity>
      <DatePicker
        modal
        date={new Date(value)}
        open={isDatePickerOpen}
        minimumDate={new Date(value)}
        onConfirm={onConfirmDatePicker}
        onCancel={onCloseDatePicker}
        mode="date"
      />
    </>
  );
};
