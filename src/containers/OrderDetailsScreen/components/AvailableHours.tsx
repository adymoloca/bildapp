import I18n from 'i18n-js';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {Colors, Fonts} from '../../../themes';
import OrderScreenLtrStyle from '../../../themes/styles/orderScreen.ltr.style';
import {IOfferFieldsError, IOrder} from '../../../utils/interfaces';
import RNPickerSelect from 'react-native-picker-select';
import GlobalLtrStyle from '../../../themes/styles/global.ltr.style';
import SupplierOfferScreenStyle from '../../../themes/styles/supplierOfferScreen.ltr.style';
import {pickerStyle} from '../../AppointmentScreen/styles';
import {hourOptions} from '../../../utils/dateUtils';
import CustomIcon from '../../../atoms/CustomIcon';

const AvailableHours = (props: {
  onChange: (availableHours: string[]) => void;
  availableHours: string[];
  order: IOrder;
  isEditable: boolean;
  selectedDate?: string | Date;
  errors: IOfferFieldsError;
  setErrors: (error: IOfferFieldsError) => void;
}) => {
  const {isEditable, onChange, availableHours} = props;
  const [selectedHour, setSelectedHour] = React.useState<string>('');
  const haveError = props.errors.availableHours;
  const onRemove = (value: string) => {
    if (isEditable) {
      onChange(availableHours.filter(item => item !== value));
    }
  };

  const onAdd = () => {
    if (haveError) {
      props.setErrors({
        ...props.errors,
        availableHours: false,
      });
    }
    if (selectedHour && !availableHours.includes(selectedHour)) {
      onChange([...availableHours, selectedHour]);
    }
  };
  return (
    <View
      style={[OrderScreenLtrStyle.order_details_container, {paddingTop: 30}]}>
      <Text style={GlobalLtrStyle.pageTitle}>{I18n.t('available_hours')}</Text>
      <View style={[{flexDirection: 'column', marginTop: 20}]}>
        {availableHours.length !== 0 && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {availableHours.map((hr: string, idx: number) => (
              <HoursAdded
                key={hr}
                value={hr}
                isEditable={props.isEditable}
                label={`${hr}:00`}
                onRemove={onRemove}
              />
            ))}
          </View>
        )}
        {isEditable && availableHours.length < 8 && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <RNPickerSelect
              useNativeAndroidPickerStyle={true}
              value={selectedHour}
              placeholder={{}}
              onValueChange={hour => {
                setSelectedHour(hour);
              }}
              onDonePress={onAdd}
              items={hourOptions(5, 24, props.selectedDate)}
              style={pickerStyle}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CustomIcon
                  style={{marginRight: 5}}
                  size={Fonts.h6}
                  color={Colors.green}
                  iconPack="custom"
                  name="add"
                />
                {haveError ? (
                  <Text style={{fontSize: Fonts.small, color: Colors.red}}>
                    {I18n.t('add_another_hour')} - Field required
                  </Text>
                ) : (
                  <Text
                    style={{fontSize: Fonts.small, color: Colors.greyIrina}}>
                    {I18n.t('add_another_hour')}
                  </Text>
                )}
              </View>
            </RNPickerSelect>
          </View>
        )}
      </View>
    </View>
  );
};

const HoursAdded = (props: {
  value: string;
  label: string;
  onRemove: (value: string) => void;
  isEditable: boolean;
}) => {
  return (
    <TouchableOpacity
      style={[
        SupplierOfferScreenStyle.hourView,
        {
          backgroundColor: Colors.green,
          marginRight: 4,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        },
      ]}
      onPress={() => props.onRemove(props.value)}>
      <Text
        style={{
          color: Colors.white,
          fontWeight: 'bold',
          fontSize: Fonts.small,
        }}>
        {props.label}
      </Text>
      {props.isEditable && (
        <CustomIcon
          style={{marginLeft: 5}}
          size={Fonts.small}
          color={Colors.white}
          name="close"
          onPress={() => props.onRemove(props.value)}
        />
      )}
    </TouchableOpacity>
  );
};

export default AvailableHours;
