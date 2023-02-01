import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '..';

const confirmationCodeStyle = StyleSheet.create({
  codeFiledRoot: { marginTop: 20 },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 50,
    fontSize: Fonts.h5,
    borderRadius: 10,
    backgroundColor: Colors.borderGrey,
    borderWidth: 2,
    borderColor: Colors.borderGrey,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: Colors.green,
  },
});
export default confirmationCodeStyle;
