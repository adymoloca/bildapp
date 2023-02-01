import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '..';

const SupplierOpenOrdersScreenLtrStyle = StyleSheet.create({
  sort_filter: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    // paddingVertical: 5,
  },
  filterOption: {
    fontSize: Fonts.regular,
    color: Colors.greyIrina,
  },
  filterOptionChecked: {
    color: Colors.green,
    fontSize: Fonts.regular,
  },
});

export default SupplierOpenOrdersScreenLtrStyle;
