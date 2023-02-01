import I18n from 'i18n-js';
import React from 'react';
import {Keyboard, Text, TouchableOpacity, View} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import CustomIcon from '../../../atoms/CustomIcon';
import Colors from '../../../themes/Colors';
import Fonts from '../../../themes/Fonts';
import GlobalLtrStyle from '../../../themes/styles/global.ltr.style';
import {formatAddress} from '../../../utils/orderUtil';
import MapScreenLtrStyle from '../styles';

interface IBottomMapSheetProps {
  address: string;
  city: string;
  loadAppointmentScreen: () => void;
  setAddress: (data: string) => void;
  setCity: (data: string) => void;
  openModal: () => void;
}
const BottomMapSheet = (props: IBottomMapSheetProps) => {
  const sheetRef = React.useRef<BottomSheet>(null);
  return (
    <BottomSheet
      enabledGestureInteraction={true} //
      ref={sheetRef}
      initialSnap={0}
      snapPoints={[220]}
      renderHeader={() => <Header {...props} />}
      renderContent={() => {
        return <Content {...props} />;
      }}
      enabledContentGestureInteraction={false}
      onCloseStart={Keyboard.dismiss}
    />
  );
};

const Content = ({loadAppointmentScreen}: IBottomMapSheetProps) => {
  return (
    <View style={[MapScreenLtrStyle.bottomSheetContent]}>
      <TouchableOpacity
        style={MapScreenLtrStyle.button}
        onPress={() => loadAppointmentScreen()}>
        <Text style={MapScreenLtrStyle.button_text}>
          {I18n.t('confirm_location')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Header = ({
  address,
  city,
  setAddress,
  openModal,
  setCity,
}: IBottomMapSheetProps) => {
  const newAddress = formatAddress(address || '');
  return (
    <View style={[MapScreenLtrStyle.searchFieldHeader]}>
      <View
        style={{
          width: 50,
          height: 5,
          borderRadius: 2.5,
          backgroundColor: Colors.black,
          opacity: 0.15,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 5,
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 15,
          }}>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <Text
              style={[GlobalLtrStyle.regularBlackText, {fontWeight: '700'}]}>
              {newAddress.length > 27
                ? newAddress.substr(0, 27) + '...'
                : newAddress}
            </Text>
            <Text
              style={[GlobalLtrStyle.regularBlackText, {fontWeight: '700'}]}>
              {city}
            </Text>
          </View>
        </View>
        <CustomIcon
          onPress={() => {
            setAddress(address);
            setCity(city);
            openModal();
          }}
          iconPack="custom"
          size={Fonts.h5}
          color={Colors.black}
          name="edit"
        />
      </View>
    </View>
  );
};

export default BottomMapSheet;
