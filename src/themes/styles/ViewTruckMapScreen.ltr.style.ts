import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '..';

const ViewTruckMapScreenLtrStyle = StyleSheet.create({
  map: {
    flex: 1,
    zIndex: 1,
  },
  eta: {
    position: 'absolute',
    fontWeight: 'bold',
    zIndex: 2,
    top: Fonts.h1 * 2.4,
    left: 5,
    padding: 10,
    backgroundColor: Colors.lightGrey,
    borderRadius: 3,
  },
  button: {
    maxHeight: 60,
    marginTop: -60,
    zIndex: 2,
    margin: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    borderRadius: 7,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    backgroundColor: Colors.green,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  button_text: {
    color: Colors.white,
    fontSize: Fonts.regular,
  },
});

export default ViewTruckMapScreenLtrStyle;
