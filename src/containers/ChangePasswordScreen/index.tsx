import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import CustomIcon from '../../atoms/CustomIcon';
import CustomBorderedTextInput from '../../components/CustomBorderedTextInput';
import CustomStatusBar from '../../components/CustomStatusBar';
import HeaderBar from '../../components/HeaderBar';
import i18n from '../../services/i18n';
import {Colors, Fonts} from '../../themes';
import loginPageStyle from '../../themes/styles/auth.ltr.style';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import OrderScreenLtrStyle from '../../themes/styles/orderScreen.ltr.style';
import {actions, selectIsLoading} from '../../redux/slices/applicationSlice';
import LoadingSpinner from '../../modals/LoadingSpinner';

const ChangePasswordScreen = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onPress = () => {
    if (password === confirmPassword) {
      dispatch(actions.changePassword({newPassword: password, navigation}));
    }
  };

  // used for switching between text fields
  const refs = [];
  refs.push(useRef());

  const disabledNextStep =
    !password || !confirmPassword || password !== confirmPassword;

  return (
    <>
      <CustomStatusBar />
      <LoadingSpinner visible={!!isLoading} textContent={''} />
      <HeaderBar
        placement="center"
        leftComponent={
          <CustomIcon
            size={Fonts.h5}
            color={Colors.black}
            name="arrow-back"
            iconPack="custom"
            onPress={navigation.goBack}
          />
        }
        centerComponent={
          <Text style={OrderScreenLtrStyle.title_text}>
            {i18n.t('change_password')}
          </Text>
        }
        rightComponent={null}
        noBorder={true}
      />
      <View style={[loginPageStyle.containerView, {margin: 20}]}>
        <View style={[GlobalLtrStyle.rowCentered]}>
          <View style={[GlobalLtrStyle.column, {width: '100%', marginTop: 30}]}>
            <CustomBorderedTextInput
              label={i18n.t('new_password')}
              value={password}
              onChange={setPassword}
              type="password"
            />
            <CustomBorderedTextInput
              label={i18n.t('confirm_password')}
              value={confirmPassword}
              onChange={setConfirmPassword}
              type="password"
            />
          </View>
        </View>
      </View>
      <View style={GlobalLtrStyle.bottomButton}>
        <Button
          title={i18n.t('save')}
          onPress={onPress}
          buttonStyle={loginPageStyle.loginButton}
          disabled={disabledNextStep}
          disabledStyle={[{backgroundColor: Colors.black}]}
          disabledTitleStyle={[{color: Colors.white}]}
        />
      </View>
    </>
  );
};

export default ChangePasswordScreen;
