import {useIsFocused} from '@react-navigation/native';
import React, {Component, useEffect} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import CustomIcon from '../../atoms/CustomIcon';
import HeaderBar from '../../components/HeaderBar';
import LoadingSpinner from '../../modals/LoadingSpinner';
import {actions} from '../../redux/slices/orderSlice';
import {actions as persistedActionUser} from '../../redux/slices/persistedUserSlice';
import {RootState} from '../../redux/store';
import i18n from '../../services/i18n';
import {Colors, Fonts} from '../../themes';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import OrderScreenLtrStyle from '../../themes/styles/orderScreen.ltr.style';
import loginPageStyle from '../ForgotPasswordScreen/styles';
import NoSupplierFound from './components/NoSupplierFound';
import {SupplierCard} from './components/SupplierCard';

interface IProps {
  navigation: any;
}

const SupplierListScreen = (props: IProps & IStateProps) => {
  const [selectedSupplierIds, setSelectedSupplierIds] = React.useState<
    string[]
  >([]);
  const {
    navigation,
    orderData,
    createOrder,
    isLoading,
    supplierList,
    getSupplierList,
    selectedSupplierIdsP,
    setSelectedSupplierIdsP,
  } = props;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getSupplierList({orderLocation: JSON.stringify(orderData.coordinates)});
    } else {
      setSelectedSupplierIds([]);
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused && selectedSupplierIdsP) {
      supplierList.forEach(supplier => {
        if (selectedSupplierIdsP.includes(supplier._id)) {
          setSelectedSupplierIds(prev =>
            Array.from(new Set([...prev, supplier._id])),
          );
        }
      });
    }
  }, [supplierList, isFocused]);

  useEffect(() => {
    setSelectedSupplierIdsP(
      Array.from(
        new Set([...selectedSupplierIds, ...(selectedSupplierIdsP || [])]),
      ),
    );
  }, [selectedSupplierIds]);

  const toggleSelected = (id: string) => {
    const newSelectedSupplierIds = [...selectedSupplierIds];
    if (newSelectedSupplierIds.includes(id)) {
      newSelectedSupplierIds.splice(newSelectedSupplierIds.indexOf(id), 1);
    } else {
      newSelectedSupplierIds.push(id);
    }
    setSelectedSupplierIds([...newSelectedSupplierIds]);
  };

  const onFinishOrder = () => {
    createOrder({
      order: {
        ...orderData,
        supplierList: selectedSupplierIds.map(el => ({_id: el})),
      },
      goToOrderList: true,
      navigation,
    });
  };

  const toggleAllSelections = () => {
    const {supplierList} = props;
    if (selectedSupplierIds.length === supplierList.length) {
      setSelectedSupplierIds([]);
    } else {
      setSelectedSupplierIds(supplierList.map(el => el._id));
    }
  };

  return (
    <>
      <SafeAreaView />
      <LoadingSpinner visible={isLoading} textContent={''} />
      <HeaderBar
        placement="center"
        noBorder={true}
        style={{marginTop: Platform.OS === 'android' ? 20 : 0}}
        leftComponent={
          <CustomIcon
            size={Fonts.h5}
            color={Colors.black}
            name="arrow-back"
            iconPack='custom'
            onPress={navigation.goBack}
          />
        }
        centerComponent={
          <Text style={OrderScreenLtrStyle.title_text}>
            {i18n.t('suppliers')}
          </Text>
        }
        rightComponent={null}
      />
      <TouchableOpacity
        style={{margin: 20, marginBottom: 5}}
        onPress={toggleAllSelections}>
        <Text style={GlobalLtrStyle.regularDarkGreyText}>{i18n.t('all')}</Text>
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          margin: 15,
          paddingBottom: 50,
        }}>
        {!supplierList?.length ? (
          <NoSupplierFound />
        ) : (
          <>
            {supplierList.map((supplier, index: number) => (
              <SupplierCard
                supplier={supplier}
                index={index}
                key={supplier._id}
                isSelected={selectedSupplierIds.includes(supplier._id)}
                isLastOne={index === supplierList?.length - 1}
                onSelect={toggleSelected}
              />
            ))}
          </>
        )}
      </ScrollView>
      {selectedSupplierIds.length > 0 && (
        <>
          <View style={GlobalLtrStyle.bottomButtonFixed}>
            <Button
              title={i18n.t('send_order')}
              disabled={
                selectedSupplierIds.length === 0 || !selectedSupplierIds
              }
              onPress={onFinishOrder}
              buttonStyle={[loginPageStyle.loginButton, {marginTop: 30}]}
            />
          </View>
          <SafeAreaView />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  supplierList: state.order.supplierList,
  orderData: state.order.orderData,
  isLoading: state.order.isLoading,
  selectedSupplierIdsP: state.persistedUser.selectedSupplierIdsP,
});

type IStateProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const mapDispatchToProps = {
  getSupplierList: actions.getSupplierList,
  createOrder: actions.createOrder,
  resetOrderData: actions.resetOrderData,
  setSelectedSupplierIdsP: persistedActionUser.setSelectedSupplierIdsP,
};

export default connect(mapStateToProps, mapDispatchToProps)(SupplierListScreen);
