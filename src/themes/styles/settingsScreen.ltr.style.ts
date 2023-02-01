import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '..';

const SettingsScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  input: {
    fontSize: Fonts.medium,
    lineHeight: Fonts.medium,
    color: Colors.black,
    marginTop: 15,
    width: 300,
    paddingVertical: 0,
    borderRadius: 0,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomColor: Colors.green,
    borderBottomWidth: 1,
  },
  addressContainer: {
    marginVertical: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  addressText: {
    color: Colors.black,
    fontSize: Fonts.medium,
    width: 250,
    paddingLeft: 15,
  },
  pickAddressBtn: {
    marginLeft: 15,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: Colors.lightGreyIrina,
    borderRadius: 5,
  },
  slider: {
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    display: 'flex',
    marginTop: 50,
    backgroundColor: Colors.green,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 6,
  },
  buttonText: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    fontSize: Fonts.medium,
    color: Colors.white,
    fontWeight: 'bold',
  },
});

export default SettingsScreenStyle;
