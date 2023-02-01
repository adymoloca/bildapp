import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '..';

const SupplierOfferScreenStyle = StyleSheet.create({
  container: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    backgroundColor: Colors.white,
    borderWidth: 0.2,
    borderColor: Colors.greyIrina,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  blackRegularText: {
    fontSize: Fonts.h5,
    color: Colors.black,
  },
  blackMediumText: {
    fontSize: Fonts.h5,
    color: Colors.black,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hourView: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  refuseButton: {
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: 150,
  },
  acceptButton: {
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.green,
    borderRadius: 10,
    width: 150,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    paddingBottom: 50,
  },
  actionSheetBottomButton: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
  },
});

export default SupplierOfferScreenStyle;
