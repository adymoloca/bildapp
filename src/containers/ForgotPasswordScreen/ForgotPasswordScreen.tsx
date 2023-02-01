import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import CustomIcon from '../../atoms/CustomIcon';
import CustomStatusBar from '../../components/CustomStatusBar';
import CustomTextInput from '../../components/CustomTextInput';
import HeaderBar from '../../components/HeaderBar';
import {selectIsLoading, actions} from '../../redux/slices/applicationSlice';
import i18n from '../../services/i18n';
import {Colors, Fonts, Metrics} from '../../themes';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';

interface IProps {
  navigation: any;
}

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const onPress = () => {
    dispatch(actions.forgetPassword({email, navigation}));
  };
  // disabledNextStep = () => {
  //   const { setEmail, state: { email, emailError } } = this;
  //   let disabled = false;

  //   if (email.length > 0 && !validateEmail(email) && !errorEmail) {
  //     setErrorEmail('Please enter a valid email');
  //     disabled = true;
  //   } else if (errorEmail && validateEmail(email)) {
  //     setErrorEmail(null);
  //     disabled = false;
  //   }

  //   if (!email) {
  //     disabled = true;
  //   }

  //   return disabled;
  // };

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
            onPress={navigation.goBack}
          />
        }
        noBorder={true}
      />
      <View style={[GlobalLtrStyle.rowCentered, {marginTop: 30}]}>
        <View style={GlobalLtrStyle.column}>
          <Text
            style={[
              GlobalLtrStyle.bigHeader,
              {color: Colors.green, marginBottom: 20},
            ]}>
            {i18n.t('reset_password')}
          </Text>
          <Text
            style={[
              GlobalLtrStyle.headline,
              {color: Colors.grey, fontSize: Fonts.medium},
            ]}>
            {i18n.t('reset_password_text')}
          </Text>
          <View style={[GlobalLtrStyle.rowCentered]}>
            <View style={[GlobalLtrStyle.column, {width: '100%'}]}>
              <CustomTextInput
                label={i18n.t('email')}
                value={email}
                type="regular"
                onChange={setEmail}
                keyboardType={'email-address'}
                error={emailError}
                isLabelAbove
                autoFocus={true}
              />
            </View>
          </View>
          <View
            style={[
              GlobalLtrStyle.rowCentered,
              {marginVertical: Metrics.doubleBaseMargin},
            ]}>
            <View style={[GlobalLtrStyle.column, {width: '100%'}]}>
              <Button
                title={i18n.t('reset_password')}
                onPress={onPress}
                buttonStyle={GlobalLtrStyle.bottomConfirmationButton}
                // disabled={disabledNextStep()}
                disabledStyle={[{backgroundColor: Colors.grey}]}
                disabledTitleStyle={[{color: Colors.white}]}
              />
            </View>
          </View>
        </View>
      </View>
      {/* </TouchableWithoutFeedback> */}
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};

export default ForgotPasswordScreen;
