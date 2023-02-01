import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../themes';
import i18n from '../../services/i18n';
import images from '../../themes/Images';
import CustomStatusBar from '../../components/CustomStatusBar';
import HeaderBar from '../../components/HeaderBar';
import CustomIcon from '../../atoms/CustomIcon';
import {useNavigation} from '@react-navigation/native';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import {AuthPathList} from '../../utils/enums';

const AccountType = ({
  onSelectAccountType,
}: {
  onSelectAccountType: (isSupplierSelected: boolean) => void;
}) => {
  const navigation: any = useNavigation();

  const onSelectClient = () => {
    navigation.navigate(AuthPathList.REGISTER, {isSupplierSelected: false});
    // onSelectAccountType(false);
  };

  const onSelectSupplier = () => {
    navigation.navigate(AuthPathList.REGISTER, {isSupplierSelected: true});
    // onSelectAccountType(true);
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  const navigateToLogin = () => {
    navigation.navigate(AuthPathList.LOGIN as any);
  };

  const MainMenu = () => {
    return (
      <>
        <View style={{marginBottom: 30}}>
          <Text
            style={{fontSize: Fonts.h5, fontWeight: '600', marginBottom: 10}}>
            {i18n.t('simple_welcome')}
          </Text>
          <Text style={{color: Colors.blackOpacity2, fontWeight: '600'}}>
            {i18n.t('select_type_of_account')}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={onSelectClient}
            style={{
              backgroundColor: '#CEF0F1',
              flexDirection: 'row',
              marginTop: 20,
              borderRadius: 10,
            }}>
            <View style={{marginLeft: 10, margin: 20, flex: 0.85}}>
              <Image source={images.shopping_cart} />
            </View>
            <View style={{flex: 1.15, marginTop: 20}}>
              <Text
                style={{
                  fontSize: Fonts.regular,
                  fontWeight: '500',
                  marginBottom: 9,
                }}>
                {i18n.t('customer')}
              </Text>
              <Text
                style={{
                  lineHeight: 23,
                  color: Colors.blackOpacity2,
                  fontWeight: '600',
                }}>
                {i18n.t('person_or_company')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSelectSupplier}
            style={{
              backgroundColor: '#FCEAD5',
              flexDirection: 'row',
              marginTop: 20,
              borderRadius: 10,
            }}>
            <View style={{marginLeft: 10, margin: 20, flex: 0.85}}>
              <Image source={images.shop} />
            </View>
            <View style={{flex: 1.15, marginTop: 20}}>
              <Text
                style={{
                  fontSize: Fonts.regular,
                  fontWeight: '500',
                  marginBottom: 9,
                }}>
                {i18n.t('supplier')}
              </Text>
              <Text
                style={{
                  lineHeight: 23,
                  color: Colors.blackOpacity2,
                  fontWeight: '600',
                }}>
                {i18n.t('only_for_companies')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <View style={{flex: 1}}>
      <CustomStatusBar />
      <HeaderBar
        isHidden={false}
        leftComponent={
          <CustomIcon
            iconPack="custom"
            name="arrow-back"
            size={Fonts.h5}
            color={Colors.black}
            onPress={onBackPress}
          />
        }
        noBorder={true}
      />
      <ScrollView>
        <View style={[GlobalLtrStyle.rowCentered]}>
          <View style={[GlobalLtrStyle.column]}>
            <MainMenu />
            {/* <RegisterForm handleInputChange={handleInputChange} onEndEditing={handleFieldEndEditing} onRegisterPress={this.onRegisterPress} state={this.state} /> */}
          </View>
        </View>
        <View
          style={[
            GlobalLtrStyle.row,
            GlobalLtrStyle.fullCenter,
            {marginTop: 15},
          ]}>
          <Text style={GlobalLtrStyle.regularDarkGreyText}>
            {i18n.t('already_have_an_account')}
          </Text>
          <TouchableOpacity onPress={navigateToLogin}>
            <Text
              style={{
                marginLeft: 5,
                color: Colors.green,
                fontSize: Fonts.regular,
              }}>
              {i18n.t('login')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountType;
