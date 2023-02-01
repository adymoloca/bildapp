import { StyleSheet } from 'react-native';
import { Colors } from '..';

const SupplierViewOpenOrderScreenLtrStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
  order_details: {
    paddingBottom: 0,
  },
  offer_details: {
    backgroundColor: Colors.white,
  },
  offer_input: {

  },
  offer_details_entry: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  offer_details_entry_title: {
    fontWeight: 'bold',
    paddingRight: 20,
    color: Colors.black,
  },
});

export default SupplierViewOpenOrderScreenLtrStyle;
