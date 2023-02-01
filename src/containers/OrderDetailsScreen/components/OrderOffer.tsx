import I18n from 'i18n-js';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Colors, Fonts} from '../../../themes';
import GlobalLtrStyle from '../../../themes/styles/global.ltr.style';
import OrderScreenLtrStyle from '../../../themes/styles/orderScreen.ltr.style';
import {IBidder, ITimeInterval, OfferTypeEnum} from '../../../utils/interfaces';
import {OfferFields} from './OfferPrice';
import SupplierOffer from './SupplierOffer';

interface IProps {
  selectedBidder?: IBidder;
  offerList: IBidder[];
  onAccept: (bidder: IBidder, timeInterval?: ITimeInterval) => void;
  onRefuse: (bidder: IBidder) => void;
}
export const OrderOffer = (props: IProps) => {
  const {selectedBidder, offerList} = props;
  return (
    <View
      style={[OrderScreenLtrStyle.order_details_container, {marginTop: 30}]}>
      <>
        <Text style={GlobalLtrStyle.pageTitle}>
          {!selectedBidder
            ? `${I18n.t('offers')} ${'(' + offerList.length + ')'}`
            : 'Order summary'}
        </Text>
        {!selectedBidder ? (
          <ScrollView
            contentContainerStyle={[OrderScreenLtrStyle.list, {marginTop: 10}]}>
            <View style={{width: '95%', alignSelf: 'center'}}>
              {offerList.length === 0 ? (
                <Text
                  style={{
                    color: Colors.black,
                    marginTop: 15,
                    fontSize: Fonts.input,
                    fontWeight: 'bold',
                  }}>
                  {I18n.t('no_offer_received')}
                </Text>
              ) : (
                offerList.map((bidder: any, idx: any) => (
                  <SupplierOffer
                    key={idx}
                    bidder={bidder}
                    onAccept={props.onAccept}
                    onRefuse={props.onRefuse}
                  />
                ))
              )}
            </View>

            <View style={{height: 50}}></View>
          </ScrollView>
        ) : (
          <View style={{marginBottom: 50}}>
            <OfferFields
              keepEditingPrice={{
                [OfferTypeEnum.Concrete]: false,
                [OfferTypeEnum.Pumping]: false,
                [OfferTypeEnum.Transport]: false,
              }}
              isEditable={false}
              setRefs={() => {}}
              offer={selectedBidder.offer}
              errors={undefined}
            />
          </View>
        )}
      </>
    </View>
  );
};
