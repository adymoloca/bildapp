import { StyleSheet, StatusBar, Dimensions } from 'react-native';
import { Colors, Fonts } from '../../themes';

const MapScreenLtrStyle = StyleSheet.create({
  container: {
    zIndex: 0,
    flex: 1,
  },
  topPart: {
    marginLeft: 7,
    marginTop: StatusBar.currentHeight || 0 > 0 ? StatusBar.currentHeight : 40,
    width: '20%',
  },
  header_text: {
    paddingLeft: 15,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: Fonts.h6,
    paddingBottom: Fonts.h6,
  },
  title_text: {
    fontSize: Fonts.h5,
    color: Colors.green,
    paddingRight: 10,
  },
  searchAddress: {
    width: 45,
    height: 45,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: ,
    // paddingHorizontal: 10,
    borderRadius: 45 / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  searchAddressInput: {
    zIndex: 0,
    backgroundColor: Colors.white,
    fontSize: Fonts.medium,
    color: Colors.black,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 7,
    width: '82%',
  },
  searchIcon: {
    position: 'absolute',
    left: '84%',
    marginRight: 20,
    padding: 10,
    marginTop: -3,
    color: Colors.black,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    width: '99.9%',
    height: '100%',
    // marginBottom: 50,
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  button: {
    marginTop: 10,
    paddingVertical: 20,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: Colors.green,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_disabled: {
    shadowColor: 'transparent',
    marginTop: 'auto',
    marginBottom: Fonts.h1,
    padding: 10,
    borderRadius: 7,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    backgroundColor: Colors.grey,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button_text: {
    color: Colors.white,
    fontSize: Fonts.regular,
    fontWeight: 'bold',
  },
  button_disabled_text: {
    color: Colors.darkGrey,
    fontSize: Fonts.regular,
  },
  marker_center: {
    left: '50%',
    marginLeft: -25,
    marginTop: -50,
    position: 'absolute',
    top: '50%',
  },
  recenter_button: {
    backgroundColor: 'rgba(255,255,255,0.73)',
    padding: 15,
    marginTop: 'auto',
    marginBottom: 300,
    marginLeft: 'auto',
    marginRight: 0,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  searchFieldHeader: {
    backgroundColor: 'white',
    padding: 20,
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    minHeight: 100,
  },
  sideMenuAnimationView: {
    position: 'absolute',
    backgroundColor: Colors.white,
    zIndex: 100,
    width: '65%',
    height: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    top: 0,
    left: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  sideMenuContainerView: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '10%',
    zIndex: 9,
  },
  sideMenuTopView: {
    alignItems: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: Colors.darkGreyIrina,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  sideMenuTopText: {
    width: '80%',
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: Fonts.medium,
    fontWeight: 'bold',
    color: Colors.black,
  },
  sideMenuItem: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomSheetContent: {
    backgroundColor: 'white',
    paddingTop: 70,
    paddingLeft: 20,
    height: Dimensions.get('screen').height * 0.85,
    marginTop: 10,
  },
  historyAddressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
});

export default MapScreenLtrStyle;
