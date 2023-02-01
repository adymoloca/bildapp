import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '..';
const width = Dimensions.get('window').width;
const height = Fonts.h5;
const RequestListScreenLtrStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  title: {
    fontFamily: 'helvetica !important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 'auto',
    borderBottomColor: 'transparent',
    paddingTop: 10,
    paddingBottom: 10,
  },
  title_text: {
    fontSize: Fonts.medium,
    fontWeight: 'bold',
    color: Colors.black,
    marginRight: 0,
  },
  select_view: {
    width: '100%',
    paddingLeft: 15,
    paddingBottom: 5,
    paddingTop: 5,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 30,
  },
  list_item: {
    borderRadius: 10,
    elevation: 1,
    paddingHorizontal: 5,
    marginVertical: 10,
    width: '95%',
    backgroundColor: Colors.white,
    flexDirection: 'row',
  },
  title_contents: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  list_item_title: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: 'normal',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  offers_count: {
    borderRadius: 25 / 2,
    paddingHorizontal: 10,
    height: 25,
    backgroundColor: Colors.green,
    overflow: 'hidden',

    justifyContent: 'center',
  },
  list_item_date_time: {
    fontSize: Fonts.regular,
    color: Colors.black,
    paddingLeft: 10,
    paddingTop: 5,
    marginTop: 5,
  },
  list_item_details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginTop: 5,
  },
  list_item_address: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
    padding: 10,
    paddingTop: 0,
    paddingRight: 5,
    paddingBottom: 0,
  },
  list_item_address_title: {
    fontSize: Fonts.regular,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  list_item_address_value: {
    fontSize: Fonts.regular - 1,
    color: Colors.greyIrina,
  },
  list_item_additional_details: {
    width: '49%',
    padding: 0,
    paddingRight: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  list_item_detail: {
    paddingTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
  },
  list_item_detail_title: {
    fontSize: Fonts.medium,
    fontWeight: 'bold',
    color: Colors.black,
  },
  list_item_detail_value: {
    paddingTop: 2,
    fontSize: Fonts.small,
    color: Colors.darkGrey,
  },
  search_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 50,
    marginHorizontal: 15,
    paddingTop: 5,
  },
  search_textinput_view: {
    width: width * 0.7,
    height: height * 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  search_textinput: {
    backgroundColor: Colors.lightGrey,
    flex: 1,
    alignItems: 'flex-start',
    fontSize: Fonts.regular,
    padding: 5,
    height: 35,
    color: Colors.black,
    // borderRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    // borderTopEndRadius: 20,
    // borderBottomEndRadius: 20,
    // paddingLeft: 50,
  },
  search_icon_container: {
    backgroundColor: Colors.lightGrey,
    justifyContent: 'center',
    paddingLeft: 5,
    height: 35,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  search_icon_view: {
    width: width * 0.2,
    maxHeight: height,
    alignItems: 'flex-end',
  },
});

export default RequestListScreenLtrStyle;