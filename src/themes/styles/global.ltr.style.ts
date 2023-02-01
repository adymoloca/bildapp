import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '..';

const GlobalLtrStyle = StyleSheet.create({
  flexView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  darkFlexView: {
    flex: 1,
    backgroundColor: 'red',
  },
  HamburgerIcon: {
    color: Colors.black,
    marginVertical: 10,
    marginLeft: 10,
  },
  headerText: {
    color: Colors.black,
    fontSize: Fonts.regular,
    paddingHorizontal: 15,
  },

  loginLovoView: {
    width: '50%',
    height: '15%',
    marginTop: '25%',
    marginBottom: '15%',
    padding: 0,
    alignSelf: 'center',
  },
  bigHeader: {
    fontSize: Fonts.h3,
    fontWeight: 'bold',
    marginBottom: Metrics.doubleBaseMargin,
  },
  pageTitle: {
    fontSize: Fonts.h5,
    fontWeight: '500',
    color: Colors.black,
  },
  headline: {
    fontSize: Fonts.regular,
    fontWeight: 'bold',
  },
  iconTextWrapper: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 10,
    width: '100%',
  },
  iconText: {
    fontWeight: '600',
    fontSize: Fonts.medium,
    marginTop: Metrics.baseMargin,
  },
  formTextInput: {
    // height: 50,
    // color: Colors.black,
    fontSize: Fonts.regular,
    borderRadius: 10,
    padding: Metrics.baseMargin,
  },
  formTextPlaceholder: {
    fontSize: Fonts.regular,
    paddingHorizontal: Metrics.baseMargin,
    color: Colors.greyIrina,
  },
  hideIcon: {
    position: 'absolute',
    right: 12,
    top: 30,
  },
  buttonStyle: {
    width: '100%',
    margin: Metrics.baseMargin,
    borderRadius: 10,
    padding: 12,
    color: Colors.black,
  },
  bottomConfirmationButton: {
    marginTop: 30,
    marginBottom: Fonts.regular,
    backgroundColor: Colors.green,
    borderRadius: 10,
    // paddingVertical: 15,
    paddingHorizontal: 20,
    // margin: Metrics.baseMargin,
    padding: Fonts.medium,
    fontSize: Fonts.regular,
  },
  column: {
    flexDirection: 'column',
    width: '85%',
  },
  row: {
    flexDirection: 'row',
  },
  rowCentered: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  borderedRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.grey,
    padding: Metrics.baseMargin,
    alignItems: 'center',
    borderRadius: 10,
  },
  fullCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerDropdownWrapper: {
    borderRadius: 10,
    color: Colors.black,
    fontSize: Fonts.small,
    paddingHorizontal: Metrics.baseMargin,
    backgroundColor: Colors.borderGrey,
    marginTop: Metrics.doubleBaseMargin,
    height: 50,
  },
  pickerDropdown: {
    width: '100%',
  },
  labeledDatePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  labeledDatePickerLabel: {
    paddingHorizontal: 0,
    textAlign: 'left',
    width: '95%',
  },
  labeledDatePickerText: {
    color: Colors.black,
    textAlign: 'left',
    fontSize: Fonts.medium,
    width: '100%',
    paddingHorizontal: Metrics.baseMargin,
  },
  dots: {
    color: Colors.darkGrey,
    width: 10,
    height: 10,
    borderRadius: 100,
  },
  lang_switcher: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected_lang: {
    marginLeft: 3,
    marginRight: 3,
    padding: 7,
    fontSize: Fonts.medium,
    color: Colors.primaryDark,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.primaryDark,
  },
  unselected_lang: {
    padding: 7,
    marginLeft: 3,
    marginRight: 3,
    fontSize: Fonts.medium,
    color: Colors.greyIrina,
  },
  regularDarkGreyText: {
    fontSize: Fonts.regular,
    color: Colors.greyIrina,
  },
  regularBlackText: {
    fontSize: Fonts.regular,
    color: Colors.black,
  },
  mediumBlackText: {
    fontSize: Fonts.medium,
    color: Colors.black,
  },
  bottomButton: { position: 'absolute', bottom: 15, left: 15, right: 15 },
  bottomButtonFixed: { marginBottom: 15, marginHorizontal: 15 },
});

export default GlobalLtrStyle;
