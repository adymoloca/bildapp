import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '..';

const loginPageStyle = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'column',
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: Colors.black,
    fontSize: 40,
    fontWeight: '800',
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1,
  },
  loginButton: {
    marginTop: 50,
    marginBottom: Fonts.regular,
    backgroundColor: Colors.green,
    borderRadius: 10,
    // paddingVertical: 15,
    paddingHorizontal: 25,
    // margin: Metrics.baseMargin,
    padding: Fonts.medium,
    fontSize: Fonts.regular,
  },
  disabledLoginButton: {
    marginTop: 50,
    marginBottom: 50,
    backgroundColor: Colors.black,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    margin: Metrics.baseMargin,
    padding: 12,
    fontSize: Fonts.regular,
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
});
export default loginPageStyle;
