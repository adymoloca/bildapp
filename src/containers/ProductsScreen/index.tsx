import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import CustomIcon from '../../atoms/CustomIcon';
import i18n from '../../services/i18n';
import {Colors, Fonts} from '../../themes';
import {ClientPathList} from '../../utils/enums';
import {
  actions,
  selectOrderData,
  selectSupplierList,
  selectIsLoading
} from '../../redux/slices/orderSlice';
import {IUser, Order} from '../../utils/interfaces';
import {getCurrentLocation} from '../../utils/geocoder';
import images from '../../themes/Images';
import {selectClientDetails} from '../../redux/slices/userSlice';
import {formatAddress} from '../../utils/orderUtil';
import LoadingSpinner from '../../modals/LoadingSpinner';
import {actions as persistedUserActions} from '../../redux/slices/persistedUserSlice';

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const orderData = useSelector(selectOrderData);
  const isLoading = useSelector(selectIsLoading);
  const isFocused = useIsFocused();
  const supplierList = useSelector(selectSupplierList);
  const clientDetails: IUser = useSelector(selectClientDetails);
  const [isCurrentLocation, setIsCurrentLocation] = useState(true);
  
  useEffect(() => {
    dispatch(persistedUserActions.getCardList());
    dispatch(persistedUserActions.getClientCompanyDetailsAttempt());
  },[])

  useEffect(() => {
    if (!isFocused) return;
    seCurrentLocation();
    }, [orderData, isFocused]);

  const seCurrentLocation = async () => {
    try {
      const currentLocation = await getCurrentLocation();
      if (orderData.coordinates.lat && orderData.coordinates.lng) {
        if (
          orderData.address === currentLocation.address ||
          currentLocation.address.includes(orderData.address)
        ) {
          setIsCurrentLocation(true);
        } else {
          setIsCurrentLocation(false);
        }
        dispatch(
          actions.getSupplierList({
            orderLocation: JSON.stringify(orderData.coordinates),
          }),
        );
      } else {
        dispatch(
          actions.setOrderData({
            ...new Order(),
            ...currentLocation,
          }),
        );
      }
    } catch (e) {}
  };

  const loading = !(supplierList.length || clientDetails.name)
  return (
    <SafeAreaView style={{padding: 15}}>
      <LoadingSpinner visible={loading} textContent={''} />
      <Header isCurrentLocation={isCurrentLocation} />
      {(!loading) && <Body />}
    </SafeAreaView>
  );
};

const Header = ({isCurrentLocation}: {isCurrentLocation: boolean}) => {
  const navigation: any = useNavigation();
  const orderData = useSelector(selectOrderData);
  const getAddress = () => {
    const address = formatAddress(orderData?.address || '');
    return address.length > 25 ? address.substr(0, 25) + '...' : address;
  };
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Icon
        style={{flex: 1}}
        size={Fonts.h5}
        color={Colors.black}
        name="menu"
        onPress={() => {
          navigation.openDrawer();
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ClientPathList.MAP);
        }}
        style={{flex: 1, flexDirection: 'row'}}>
        <Text style={[{color: Colors.black, fontSize: Fonts.medium}]}>
          {isCurrentLocation ? i18n.t('current_location') : getAddress()}
        </Text>
        <CustomIcon
          style={{marginLeft: 10}}
          size={Fonts.regular}
          color={Colors.black}
          name="chevron-down"
        />
      </TouchableOpacity>
      <View style={{flex: 1}}></View>
    </View>
  );
};

const Body = () => {
  const supplierList = useSelector(selectSupplierList);
  const clientDetails: IUser = useSelector(selectClientDetails);
  const navigation: any = useNavigation();
  return (
    <ScrollView style={{display: 'flex', height: '100%'}}>
      <Text style={BodyStyle.title}>{`Hi, ${clientDetails.name}!`}</Text>
      <Text style={BodyStyle.bigTitle}>{i18n.t('what_do_you_need')}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ClientPathList.APPOINTMENT);
        }}>
        <ImageBackground
          style={ImageStyle.imageContainer}
          imageStyle={{borderRadius: 8}}
          source={images.products2}>
          <Text style={ImageStyle.title}>{i18n.t('ready_mix_concrete')}</Text>
          <Text style={ImageStyle.subtitle}>{`${supplierList.length} ${i18n.t(
            'suppliers',
          )}`}</Text>
        </ImageBackground>
      </TouchableOpacity>

      <ImageBackground
        style={ImageStyle.imageContainer}
        imageStyle={{borderRadius: 8}}
        source={images.products1}>
        <Text style={ImageStyle.title}>{i18n.t('equipment_rent')}</Text>
        <View style={ImageStyle.availableSoonContainer}>
          <Text style={ImageStyle.availableSoon}>
            {i18n.t('available_soon')}
          </Text>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const BodyStyle = StyleSheet.create({
  bigTitle: {
    color: Colors.black,
    fontSize: Fonts.h4,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    color: Colors.greyIrina,
    fontSize: Fonts.bigger,
    marginBottom: 5,
    marginTop: 50,
  },
});
const ImageStyle = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 190,
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 3,
    elevation: 4,
  },
  title: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: Fonts.h3,
  },
  subtitle: {
    color: Colors.white,
    marginTop: 10,
    fontSize: Fonts.bigger,
  },
  availableSoon: {
    color: Colors.black,

    fontSize: Fonts.bigger,
    paddingHorizontal: 35,
    paddingVertical: 5,
  },
  availableSoonContainer: {
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255, 0.8)',
    borderRadius: 100,
  },
});

export default ProductsScreen;
