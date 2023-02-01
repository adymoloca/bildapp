import React from 'react';
import {IState} from './RegisterScreen';
import i18n from '../../services/i18n';
import {Colors, Fonts} from '../../themes';
import {Button} from 'react-native-elements';
import CustomTextInput from '../../components/CustomTextInput';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';

import PhoneNumberInputWrapper from '../../components/PhoneNumberInputWrapper';

const RegisterForm = ({
  handleInputChange,
  onRegisterPress,
  onEndEditing,
  isSupplierType,
  state,
  setError,
}: {
  handleInputChange: (text: string) => void;
  onRegisterPress: () => void;
  onEndEditing?: (value: string, inputName?: string) => void;
  isSupplierType: boolean;
  state: IState;
  setError?: (value: any) => void;
}) => {
  const {
    isEnabled,
    name,
    email,
    phone,
    password,
    confirmPassword,
    companyName,
    nameError,
    emailError,
    phoneError,
    passwordError,
    confirmPasswordError,
  } = state;
  return (
    <>
      <CustomTextInput
        autoFocus={false}
        label={isSupplierType ? i18n.t('business_name') : i18n.t('full_name')}
        value={isSupplierType ? companyName : name}
        inputName={isSupplierType ? 'companyName' : 'name'}
        autoCapitalize='words'
        isLabelAbove
        // ref={refs[0]}
        onEndEditing={onEndEditing}
        onChange={handleInputChange}
        // onSubmitEditing={() => refs[1].current.focus()}
        error={nameError}
        extraStyle={{fontSize: Fonts.regular}}
      />
      <CustomTextInput
        label={i18n.t('email')}
        value={email}
        inputName="email"
        onEndEditing={onEndEditing}
        onChange={handleInputChange}
        keyboardType={'email-address'}
        autoCapitalize='none'
        isLabelAbove
        autoCorrect={false}
        // ref={refs[1]}
        // onSubmitEditing={() => refs[2].current.focus()}
        error={emailError}
        extraStyle={{fontSize: Fonts.regular}}
      />
      <PhoneNumberInputWrapper
        label={i18n.t('phone_number') + ' '}
        value={phone}
        isLabelAbove
        onChange={handleInputChange}
        inputName="phone"
        error={phoneError}
        setError={error => {
          setError && setError({phoneError: error});
        }}
      />
      <CustomTextInput
        label={i18n.t('password')}
        value={password}
        inputName="password"
        type="password"
        isLabelAbove
        onEndEditing={onEndEditing}
        onChange={handleInputChange}
        // ref={refs[3]}
        // onSubmitEditing={() => refs[4].current.focus()}
        error={passwordError}
        extraStyle={{fontSize: Fonts.regular}}
      />
      <CustomTextInput
        label={i18n.t('confirm_password')}
        value={confirmPassword}
        inputName="confirmPassword"
        type="password"
        isLabelAbove
        onEndEditing={onEndEditing}
        onChange={handleInputChange}
        // ref={refs[4]}
        error={confirmPasswordError}
        extraStyle={{fontSize: Fonts.regular}}
      />
      {/* {isEnabled && (
        <CustomTextInput
          label={i18n.t('company_name')}
          // placeholder={i18n.t('company_name')}
          inputName='companyName'
          value={companyName}
          type="name"
          onChange={handleInputChange}
        />
      )} */}
      <Button
        title={i18n.t('create_account')}
        onPress={onRegisterPress}
        buttonStyle={GlobalLtrStyle.bottomConfirmationButton}
        // disabled={disabledNextStep()}
        disabledStyle={[{backgroundColor: Colors.grey}]}
        disabledTitleStyle={[{color: Colors.white}]}
      />
    </>
  );
};

export default RegisterForm;
