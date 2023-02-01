import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '..';

const MyAccountScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'column',
  },
  generalFieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkGreyIrina,
  },
  generalFieldContainerNoSeparator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingRight: 15,
    marginHorizontal: 15,
  },
  generalFieldView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  billingDetailsTextLabel: {
    fontSize: Fonts.h5,
    fontWeight: 'bold',
    color: Colors.greyIrina,
    marginTop: 20,
    marginBottom: -20,
    marginLeft: 5,
  },
});

export default MyAccountScreenStyle;
