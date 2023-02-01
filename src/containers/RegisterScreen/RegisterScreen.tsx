import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import CustomIcon from '../../atoms/CustomIcon';
import HeaderBar from '../../components/HeaderBar';
import { RootState } from '../../redux/store';
import i18n from '../../services/i18n';
import { Colors, Fonts } from '../../themes';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import { AuthPathList } from '../../utils/enums';
import { actions } from '../../redux/slices/applicationSlice';
import CustomStatusBar from '../../components/CustomStatusBar';
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from '../../utils/utils';
import RegisterForm from './RegisterForm';
import RegisterSuccessModal from './RegisterSuccessModal';

interface IProps {
  navigation: any;
  route: any;
}

export interface IState {
  isEnabled: boolean;
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  nameError: string;
  emailError: string;
  phoneError: string;
  passwordError: string;
  confirmPasswordError: string;
}

class RegisterScreen extends Component<IProps & IStateProps> {
  state: IState = {
    isEnabled: false,
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    nameError: '',
    emailError: '',
    phoneError: '',
    passwordError: '',
    confirmPasswordError: '',
  };

  static getDerivedStateFromProps = (
    nextProps: IProps & IStateProps,
    state: IState,
  ) => {
    if (nextProps.error) {
      return {
        emailError: nextProps.error,
      };
    }
    return null;
  };

  onBackPress = () => {
    const {
      props: { navigation },
    } = this;
    navigation.goBack();
  };

  componentWillUnmount() {
    this.props.setError('');
    this.props.setRegisterSuccess(false);
  }

  handleInputChange = (value: string | number | boolean, key?: string) => {
    if (key) {
      if (this.props.error) {
        this.props.setError('');
      }
      this.setState({ ...this.state, [key]: value, [`${key}Error`]: '' });
    }
  };

  navigateToLogin = () => {
    this.props.navigation.navigate(AuthPathList.LOGIN);
  };

  handleFieldEndEditing = (value: string, inputName?: string) => {
    const {
      onValidateName,
      onValidateEmail,
      onValidatePassword,
      onValidateConfirmPassword,
      validateFields,
    } = this;
    let error = '';
    switch (inputName) {
      case 'name':
      case 'companyName':
        error = onValidateName(value);
        this.setState({ nameError: error });
        break;
      case 'email':
        error = onValidateEmail(value);
        this.setState({ emailError: error });
        break;
      case 'password':
        error = onValidatePassword(value);
        this.setState({ passwordError: error });
        break;
      case 'confirmPassword':
        error = onValidateConfirmPassword(value);
        this.setState({ confirmPasswordError: error });
        break;
      default:
        validateFields();
    }
  };

  onValidateName = (value: string): string => {
    if (!validateName(value)) {
      return i18n.t('name_error');
    } else {
      return '';
    }
  };

  onValidateEmail = (value: string): string => {
    if (!validateEmail(value)) {
      return i18n.t('email_error');
    } else {
      return '';
    }
  };

  onValidatePassword = (value: string): string => {
    if (!validatePassword(value)) {
      return i18n.t('password_error');
    } else {
      return '';
    }
  };

  onValidatePhone = (value: string): string => {
    if (!validatePhone(value)) {
      return i18n.t('phone_error');
    } else {
      return '';
    }
  };

  onValidateConfirmPassword = (value: string): string => {
    const {
      state: { password },
    } = this;
    if (password !== value) {
      return i18n.t('password_missmatch_error');
    } else if (!value.length) {
      return i18n.t('empty_password_error');
    } else {
      return '';
    }
  };

  validateFields = () => {
    const {
      state: { name, companyName, email, password, phone, confirmPassword },
    } = this;

    const nameField = this.props.route.params.isSupplierSelected
      ? companyName
      : name;

    const localNameError = this.onValidateName(nameField);
    const localEmailError = this.onValidateEmail(email);
    const localPasswordError = this.onValidatePassword(password);
    const localPhoneError = this.onValidatePhone(phone);
    const localConfirmPasswordError =
      this.onValidateConfirmPassword(confirmPassword);

    this.setState({
      nameError: localNameError,
      emailError: localEmailError,
      passwordError: localPasswordError,
      confirmPasswordError: localConfirmPasswordError,
      phoneError: localPhoneError,
    });

    if (
      !localNameError &&
      !localEmailError &&
      !localPasswordError &&
      !localConfirmPasswordError
    ) {
      return true;
    } else {
      return false;
    }
  };

  onRegisterPress = () => {
    if (this.validateFields()) {
      if (this.props.route.params.isSupplierSelected) {
        this.props.registerSupplier({
          registerData: {
            company: this.state.companyName,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
          },
          navigation: this.props.navigation,
        });
      } else {
        this.props.registerClient({
          registerData: {
            fullName: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
          },
          navigation: this.props.navigation,
        });
      }
    }
  };

  onCloseModal = () => { 
    const {props: { setRegisterSuccess}, navigateToLogin} = this;
    navigateToLogin();
    setRegisterSuccess(false);
  }

  render() {
    const {
      navigateToLogin,
      onBackPress,
      handleInputChange,
      handleFieldEndEditing,
    } = this;
    return (
      <View style={{ flex: 1 }}>
        <CustomStatusBar />
        <HeaderBar
          isHidden={false}
          leftComponent={
            <CustomIcon
              name="arrow-back"
              size={Fonts.h5}
              iconPack="custom"
              color={Colors.black}
              onPress={onBackPress}
            />
          }
          noBorder={true}
        />
        <ScrollView style={{ paddingTop: 50 }}>
          <View style={[GlobalLtrStyle.rowCentered]}>
            <View style={[GlobalLtrStyle.column]}>
              <RegisterForm
                handleInputChange={handleInputChange}
                onEndEditing={handleFieldEndEditing}
                onRegisterPress={this.onRegisterPress}
                isSupplierType={this.props.route.params.isSupplierSelected}
                state={this.state}
                setError={(error: any) => {
                  this.setState(error);
                }}
              />
            </View>
          </View>
          <View
            style={[
              GlobalLtrStyle.row,
              GlobalLtrStyle.fullCenter,
              { marginTop: 10 },
            ]}>
            <Text style={GlobalLtrStyle.regularDarkGreyText}>
              {this.props.route.params.isSupplierSelected
                ? i18n.t('already_registered')
                : i18n.t('already_have_an_account')}
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
        <RegisterSuccessModal
          resend={this.onRegisterPress}
          close={this.onCloseModal}
          isVisible={this.props.registerSuccess}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  deviceID: state.application.deviceID,
  error: state.application.registerError,
  registerSuccess: state.application.registerSuccess,
});

type IStateProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const mapDispatchToProps = {
  registerClient: actions.registerClient,
  registerSupplier: actions.registerSupplier,
  setError: actions.setRegisterError,
  setRegisterSuccess: actions.setRegisterSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
