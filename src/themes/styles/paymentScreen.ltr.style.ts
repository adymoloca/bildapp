import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '..';

const PaymentScreenLtrStyle = StyleSheet.create({
  header_text: {
    paddingLeft: 15,
  },
  header_step_text: {
    color: Colors.grey,
    fontWeight: 'bold',
    fontSize: Fonts.h6,
  },
  header_schedule_text: {
    color: Colors.green,
    fontWeight: 'bold',
    fontSize: Fonts.h3,
  },
  order_details: {
    padding: 20,
  },
  order_title: {
    fontSize: Fonts.regular,
    color: Colors.green,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  supplier_name: {
    fontSize: Fonts.medium,
    color: Colors.green,
    paddingBottom: 10,
  },
  address: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingBottom: 10,
  },
  address_title: {
    fontSize: Fonts.medium,
    color: Colors.white,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  address_value: {
    fontSize: Fonts.small,
    color: Colors.white,
  },
  detail: {
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  detail_title: {
    fontSize: Fonts.small,
    color: Colors.white,
    fontWeight: 'bold',
  },
  detail_value: {
    fontSize: Fonts.small,
    color: Colors.white,
  },
  total_payment: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: Colors.grey,
    paddingTop: 10,
    marginTop: 10,
  },
  total_payment_title: {
    fontSize: Fonts.h6,
    color: Colors.white,
    fontWeight: 'bold',
  },
  total_payment_value: {
    fontSize: Fonts.regular,
    color: Colors.white,
  },
  card_details: {
    paddingVertical: 15,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card_inputs: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: Fonts.regular,
    borderRadius: 7,
    backgroundColor: Colors.lightGrey,
    marginBottom: 15,
    height: 50,
  },
  cardView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10,
    margin: 10,
  },
  cardText: {
    fontSize: Fonts.regular,
    color: Colors.black,
    marginLeft: 20,
  },
  cardIndicator: {
    fontSize: Fonts.regular,
    color: Colors.black,
    marginBottom: 10,
  },
  addCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 15,
  },
});

export default PaymentScreenLtrStyle;
