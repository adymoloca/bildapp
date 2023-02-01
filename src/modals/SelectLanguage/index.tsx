import {View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import i18n from '../../services/i18n';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import {Colors, Fonts} from '../../themes';
import MyAccountScreenStyle from '../../themes/styles/myAccountScreen.ltr.style';
import CustomIcon from '../../atoms/CustomIcon';
import PaymentScreenLtrStyle from '../../themes/styles/paymentScreen.ltr.style';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux/slices/applicationSlice';

export default function SelectLanguage({visible, onClose}: any) {
  const [lang, setLang] = useState(i18n.locale);
  const dispatch = useDispatch();

  const onSetLanguage = (language: string) => {
    i18n.locale = language;
    dispatch(actions.setLanguage(language));
  };
  useEffect(() => {
    if (!visible) { 
      setLang(i18n.locale);
    }
  }, [visible])

  const languageList = [
    {
      locale: 'en',
      callback: () => setLang('en'),
      image: require('../../assets/images/united-kingdom.png'),
      title: 'English',
    },
    {
      locale: 'ro',
      callback: () => setLang('ro'),
      image: require('../../assets/images/romania.png'),
      title: 'Română',
    },
  ];

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.2)',
          flexDirection: 'column',
          alignContent: 'flex-end',
          paddingBottom: 30,
        }}>
        <TouchableOpacity onPress={onClose} style={{flex: 1}} />
        <View
          style={{
            backgroundColor: Colors.white,
            borderRadius: 10,
            margin: 10,
          }}>
          <View
            style={{
              padding: 20,
              borderBottomWidth: 0.5,
              borderBottomColor: Colors.grey,
              alignItems: 'center',
            }}>
            <Text style={GlobalLtrStyle.regularBlackText}>
              {i18n.t('select_preffered_language')}
            </Text>
          </View>
          {languageList.map((item, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={item.callback}
              style={{
                padding: 20,
                flexDirection: 'row',
                borderBottomWidth: 0.5,
                borderBottomColor: Colors.grey,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={MyAccountScreenStyle.generalFieldView}>
                <Image
                  style={{width: Fonts.h5, height: Fonts.h5}}
                  source={item.image}
                />
                <Text style={PaymentScreenLtrStyle.cardText}>{item.title}</Text>
              </View>
              {lang === item.locale && (
                <CustomIcon
                  size={Fonts.h6}
                  color={Colors.green}
                  name={'checkmark'}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.white,
            borderRadius: 10,
            padding: 20,
            margin: 10,
            borderWidth: 1,
            borderColor: Colors.grey,
            alignItems: 'center',
          }}
          onPress={() => {
            onClose();
            onSetLanguage(lang);
          }}>
          <Text style={GlobalLtrStyle.regularBlackText}>{i18n.t('apply')}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
