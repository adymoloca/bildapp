import I18n from 'i18n-js';
import React, {useEffect, useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputFocusEventData,
  View,
} from 'react-native';
import CustomIcon from '../../../atoms/CustomIcon';
import {Colors, Fonts} from '../../../themes';
import GlobalLtrStyle from '../../../themes/styles/global.ltr.style';
import OrderScreenLtrStyle from '../../../themes/styles/orderScreen.ltr.style';
import {SupplierPathList} from '../../../utils/enums';
import {
  IOffer,
  IOfferData,
  IOrder,
  OfferTypeEnum,
  IOfferFieldsError,
} from '../../../utils/interfaces';

const OfferPrice = ({
  offer,
  setOffer,
  isEditable,
  navigation,
  order,
  updateOffer,
  setRefs,
  errors,
  setErrors,
  keepEditingPrice,
}: {
  offer: IOffer;
  isEditable: boolean;
  setOffer: (offer: IOffer) => void;
  navigation: any;
  order: IOrder;
  keepEditingPrice: any;
  setRefs: (type: OfferTypeEnum, node: TextInput) => void;
  updateOffer?: (type: OfferTypeEnum, offer: IOfferData) => void;
  errors: IOfferFieldsError;
  setErrors: (error: IOfferFieldsError) => void;
}): JSX.Element => {
  const onChange = (type: OfferTypeEnum, offerData: IOfferData) => {
    setOffer({
      ...offer,
      [type]: {
        ...offerData,
      },
    });
  };
  return (
    <>
      <View
        style={[OrderScreenLtrStyle.order_details_container, {paddingTop: 30}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={GlobalLtrStyle.pageTitle}>{I18n.t('offer_price')}</Text>
          {isEditable && (
            <CustomIcon
              onPress={() => {
                navigation.navigate(SupplierPathList.EDIT_PAYMENT_ORDER);
              }}
              size={Fonts.h5}
              color={Colors.green}
              iconPack="custom"
              name="edit"
            />
          )}
        </View>
        <OfferFields
          keepEditingPrice={keepEditingPrice}
          isEditable={isEditable}
          offer={offer}
          setRefs={setRefs}
          setErrors={setErrors}
          errors={errors}
          updateOffer={updateOffer}
          onChange={onChange}
        />
      </View>
    </>
  );
};

export const OfferFields = ({
  offer,
  isEditable,
  updateOffer,
  keepEditingPrice,
  setRefs,
  ...props
}: {
  offer: IOffer;
  isEditable: boolean;
  keepEditingPrice: any;
  setRefs: (type: OfferTypeEnum, node: TextInput) => void;
  updateOffer?: (type: OfferTypeEnum, offer: IOfferData) => void;
  onChange?: (type: OfferTypeEnum, offer: IOfferData) => void;
  errors?: IOfferFieldsError;
  setErrors?: (error: IOfferFieldsError) => void;
}) => {
  const {onChange = () => {}} = props;
  return (
    <View
      style={{
        flexDirection: 'column',
        paddingTop: 20,
      }}>
      <OfferField
        isEditable={
          keepEditingPrice[OfferTypeEnum.Concrete] ||
          (isEditable && offer.concrete.isNew)
        }
        setRefs={setRefs}
        errors={props.errors}
        setErrors={props.setErrors}
        offerData={offer.concrete}
        type={OfferTypeEnum.Concrete}
        updateOffer={updateOffer}
        onChange={onChange}
      />
      <OfferField
        isEditable={
          keepEditingPrice[OfferTypeEnum.Transport] ||
          (isEditable && offer.transport.isNew)
        }
        setRefs={setRefs}
        errors={props.errors}
        setErrors={props.setErrors}
        offerData={offer.transport}
        type={OfferTypeEnum.Transport}
        updateOffer={updateOffer}
        onChange={onChange}
      />
      <OfferField
        isEditable={
          keepEditingPrice[OfferTypeEnum.Pumping] ||
          (isEditable && offer.pumping.isNew)
        }
        setRefs={setRefs}
        errors={props.errors}
        setErrors={props.setErrors}
        offerData={offer.pumping}
        type={OfferTypeEnum.Pumping}
        updateOffer={updateOffer}
        onChange={onChange}
      />
      <TotalField offer={offer} />
    </View>
  );
};
const TotalField = ({offer}: {offer: IOffer}) => {
  const [total, setTotal] = useState<string>('0');

  useEffect(() => {
    calculateTotal();
  }, [offer]);

  const calculateTotal = () => {
    let newTotal: number = 0;
    let price: number = parseFloat(offer.concrete.price);
    price = isNaN(price) ? 0 : price;
    newTotal += offer.concrete.quantity * getPrice(offer.concrete.price);
    newTotal += offer.transport.quantity * getPrice(offer.transport.price);
    newTotal += offer.pumping.quantity * getPrice(offer.pumping.price);
    setTotal(newTotal.toFixed(2));
  };

  const getPrice = (price: string) => {
    let newPrice: number = parseFloat(price);
    return isNaN(newPrice) ? 0 : newPrice;
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
      }}>
      <Text style={[GlobalLtrStyle.regularBlackText, {fontWeight: 'bold'}]}>
        Total
      </Text>
      <Text style={[GlobalLtrStyle.regularBlackText, {fontWeight: 'bold'}]}>
        {total}
      </Text>
    </View>
  );
};
const OfferField = (props: {
  offerData: IOfferData;
  type: OfferTypeEnum;
  isEditable: boolean;
  updateOffer?: (type: OfferTypeEnum, offer: IOfferData) => void;
  onChange: (type: OfferTypeEnum, offerData: IOfferData) => void;
  setRefs: (type: OfferTypeEnum, node: TextInput) => void;
  errors?: IOfferFieldsError;
  setErrors?: (error: IOfferFieldsError) => void;
}) => {
  const {offerData, type} = props;

  const [price, setPrice] = useState<string>(offerData.price);
  useEffect(() => {
    setPrice(offerData.price);
  }, [offerData.price]);

  if (!offerData.quantity) {
    return null;
  }
  const validate = (s: string) => {
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
  };
  const haveError = props?.errors?.[props.type];
  const onChangePrice = (value: string) => {
    if (haveError && props.setErrors) {
      //@ts-ignore
      props.setErrors({...props.errors, [props.type]: false});
    }
    if (validate(value)) {
      if (props.updateOffer) {
        setPrice(value);
      } else {
        props.onChange(type, {
          ...offerData,
          price: value,
        });
      }
    }
  };

  const onUpdateOffer = () => {
    const priceNumber = parseFloat(price);
    if (props.updateOffer && priceNumber > 0) {
      props.updateOffer(type, {
        ...offerData,
        price: price,
      });
    }
  };

  if (props.isEditable) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[GlobalLtrStyle.regularBlackText]}>
            {`${offerData.quantity}X    `}
          </Text>
          <Text style={[GlobalLtrStyle.regularBlackText]}>
            {offerData.label}
          </Text>
        </View>
        <View style={{width: '30%', alignItems: 'flex-end'}}>
          <TextInput
            ref={node => {
              node && props.setRefs(type, node);
            }}
            style={[
              GlobalLtrStyle.regularBlackText,
              {
                padding: 5,
                borderBottomColor: Colors.borderGrey,
                borderBottomWidth: 1,
                width: '100%',
                textAlign: 'right',
              },
            ]}
            onSubmitEditing={() => {
              props.updateOffer && onUpdateOffer();
            }}
            placeholder={'0.00'}
            onBlur={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
              if (props.updateOffer) {
                setPrice(offerData.price);
              }
            }}
            value={price ? `${price}` : ''}
            keyboardType={'numeric'}
            returnKeyType={'done'}
            onChangeText={onChangePrice}
          />
          {haveError && <Text>field required</Text>}
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[GlobalLtrStyle.regularBlackText]}>
            {`${offerData.quantity}X    `}
          </Text>
          <Text style={[GlobalLtrStyle.regularBlackText]}>
            {offerData.label}
          </Text>
        </View>
        <Text style={[GlobalLtrStyle.regularBlackText]}>{offerData.price}</Text>
      </View>
    );
  }
};

export default OfferPrice;
