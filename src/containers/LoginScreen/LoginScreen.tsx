import React, {Component} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import CustomStatusBar from '../../components/CustomStatusBar';
import CustomTextInput from '../../components/CustomTextInput';
import {actions as applicationActions} from '../../redux/slices/applicationSlice';
import {RootState} from '../../redux/store';
import i18n from '../../services/i18n';
import {Colors, Fonts} from '../../themes';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import {AuthPathList} from '../../utils/enums';
import {validateEmail} from '../../utils/utils';
import styles from './styles';

interface IState {
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
}

interface IProps {
  navigation: any;
}

class LoginScreen extends Component<IProps & IStateProps, IState> {
  state: IState = {
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  };

  static getDerivedStateFromProps = (
    nextProps: IProps & IStateProps,
    state: IState,
  ) => {
    return {
      emailError: nextProps.error || state.emailError,
    };
  };

  handleInputChange = (value: string | number | boolean, key?: string) => {
    if (key) {
      if (this.props.error) {
        this.props.setError('');
      }
      this.setState({...this.state, [key]: value, [`${key}Error`]: ''});
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
    if (!value) {
      return i18n.t('password_error');
    } else {
      return '';
    }
  };

  validateFields = () => {
    const {
      onValidateEmail,
      onValidatePassword,
      state: {email, password},
    } = this;

    const localEmailError = onValidateEmail(email);
    const localPasswordError = onValidatePassword(password);

    this.setState({
      emailError: localEmailError,
      passwordError: localPasswordError,
    });

    if (!localEmailError && !localPasswordError) {
      return true;
    } else {
      return false;
    }
  };

  onLogin = () => {
    if (this.validateFields()) {
      this.props.login({
        email: this.state.email,
        password: this.state.password,
        deviceID: this.props.deviceID,
      });
    }
  };

  handleFieldEndEditing = (value: string, inputName?: string) => {
    const {onValidateEmail, onValidatePassword, validateFields} = this;
    let error = '';
    switch (inputName) {
      case 'email':
        error = onValidateEmail(value);
        this.setState({emailError: error});
        break;
      case 'password':
        error = onValidatePassword(value);
        this.setState({passwordError: error});
        break;
      default:
        validateFields();
    }
  };

  navigateToRegister = () => {
    this.props.navigation.navigate(AuthPathList.ACCOUNT_TYPE);
  };

  navigateToForgotPassword = () => {
    this.props.navigation.navigate(AuthPathList.FORGOT_PASSWORD);
  };

  render() {
    const {
      handleInputChange,
      navigateToRegister,
      navigateToForgotPassword,
      onLogin,
      handleFieldEndEditing,
      state: {email, emailError, password, passwordError},
    } = this;
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{paddingVertical: 25, flex: 1}}>
          <CustomStatusBar />
          <Image
            style={[
              styles.logoContainer,
              GlobalLtrStyle.loginLovoView,
              {height: 100},
            ]}
            source={require('../../assets/images/bild.png')}
          />
          <View style={GlobalLtrStyle.rowCentered}>
            <View style={[GlobalLtrStyle.column]}>
              <CustomTextInput
                label={i18n.t('email')}
                inputName="email"
                value={email}
                autoCapitalize="none"
                onChange={handleInputChange}
                keyboardType={'email-address'}
                autoCorrect={false}
                onEndEditing={handleFieldEndEditing}
                extraStyle={{fontSize: Fonts.regular}}
                error={emailError}
              />
              <CustomTextInput
                label={i18n.t('password')}
                inputName="password"
                value={password}
                type="password"
                onChange={handleInputChange}
                onEndEditing={handleFieldEndEditing}
                extraStyle={{fontSize: Fonts.regular}}
                error={passwordError}
              />
              <Button
                title={i18n.t('login')}
                onPress={onLogin}
                buttonStyle={GlobalLtrStyle.bottomConfirmationButton}
              />

              <View style={[GlobalLtrStyle.row, GlobalLtrStyle.fullCenter]}>
                <Text
                  style={[{marginLeft: 5}, GlobalLtrStyle.regularDarkGreyText]}>
                  {i18n.t('no_account')}
                </Text>
                <TouchableOpacity onPress={navigateToRegister}>
                  <Text
                    style={{
                      marginLeft: 5,
                      color: Colors.green,
                      fontSize: Fonts.regular,
                    }}>
                    {i18n.t('sign_up')}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={navigateToForgotPassword}>
                <View
                  style={[
                    GlobalLtrStyle.row,
                    GlobalLtrStyle.fullCenter,
                    {marginTop: 10},
                  ]}>
                  <Text
                    style={[
                      {marginLeft: 5},
                      GlobalLtrStyle.regularDarkGreyText,
                    ]}>
                    {i18n.t('forgot_password') + '?'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  deviceID: state.application.deviceID,
  error: state.application.loginError,
});

type IStateProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const mapDispatchToProps = {
  login: applicationActions.login,
  setError: applicationActions.setLoginError,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
