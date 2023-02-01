import { StyleSheet } from 'react-native';

const CustomCheckboxLtrStyle = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    marginBottom: 3,
    marginLeft: 5,
    paddingLeft: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  linkText: {
    marginLeft: 5,
    textTransform: 'capitalize',
  },
});

export default CustomCheckboxLtrStyle;
