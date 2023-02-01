import React, {useEffect, useState} from 'react';
import {SectionList, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// import {debounce} from 'lodash';
import PaymentListItem from '../../components/PaymentListItem';
import SupplierSearchOrder from '../../components/SupplierSearchOrder';
import {Colors, Fonts} from '../../themes';
import {
  actions as userActions,
  selectIsLoading,
  selectSupplierPaymentList,
} from '../../redux/slices/userSlice';
import {ISupplierPayment, ITransaction} from '../../utils/interfaces';
import i18n from '../../services/i18n';
import BottomTabNavigator from '../../components/BottomTabNavigator';
import CustomStatusBar from '../../components/CustomStatusBar';
import {SupplierPathList} from '../../utils/enums';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import LoadingSpinner from '../../modals/LoadingSpinner';
import I18n from 'i18n-js';

const PaymentListScreen = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [isSearchExpanded, setIsSearchExpanded] = useState<boolean>(false);
  const [localPaymentData, setLocalPaymentData] = useState<{title: string; data: ITransaction[]}[]
>([]);
  const [initialLocalPaymentData, setInitialLocalPaymentData] = useState<
    {title: string; data: ITransaction[]}[]
  >([]);
  const debouncedValue = useDebounce(searchText, 500)
8
  const dispatch = useDispatch();
  const onGetSupplierPaymentList = () =>
    dispatch(userActions.getSupplierPaymentList());
  const selectedSupplierPaymentList = useSelector(selectSupplierPaymentList);
  const isFocused = useIsFocused();
  const onSearchPress = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };
  const isLoading = useSelector(selectIsLoading);
  const navigation: any = useNavigation();

  const parsePaymentData = (supplierPaymentList: ISupplierPayment[]) => {
    let parsedPaymentObject = new Map<string, ITransaction[]>();
    for (let i = 0; i < supplierPaymentList.length; i++) {
      const createdDate = new Date(
        supplierPaymentList[i].created * 1000,
      );
      const stringDate = createdDate.toLocaleDateString(i18n.locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const parsedPayment: ITransaction = {
        id: supplierPaymentList[i].id,
        name: supplierPaymentList[i].name,
        transactionDate: createdDate,
        ammount: supplierPaymentList[i].amount / 100,
        currency: supplierPaymentList[i].currency,
        storno: false,
        cardType: 'visa',
        fee: supplierPaymentList[i].fee / 100,
      };
        if(parsedPayment){
          if(!parsedPaymentObject.has(stringDate)){
            parsedPaymentObject.set(stringDate, [])
          }
          parsedPaymentObject.get(stringDate)?.push(parsedPayment);
        }
    }
    let parsedPaymentList = []
    for (const entry of parsedPaymentObject.entries()) {
      parsedPaymentList.push({title: entry[0], data: entry[1]})
    }
    return parsedPaymentList;
  };

  const onSetSearch = (value: string) => {
    // let paymentList = [];
    let fullPaymentList = selectedSupplierPaymentList.slice().sort((a, b) => (Number(b.created) - Number(a.created)))
    let supplierPaymentList: ISupplierPayment[] = [];
    if (value && value.length > 0 && selectedSupplierPaymentList) {
      for (let dateIndex = 0; dateIndex < fullPaymentList.length; dateIndex++) {
        if ( fullPaymentList[dateIndex].name?.search(new RegExp(value, 'i'),) != -1 ) {
            supplierPaymentList.push(fullPaymentList[dateIndex])
        }
      }
     
      let paymentList = parsePaymentData(supplierPaymentList)
      setLocalPaymentData(paymentList)
    } else {
      setLocalPaymentData(initialLocalPaymentData);
    }
  };

  useEffect(() => {
        if (debouncedValue) {
          onSetSearch(searchText)
        } else {
          setLocalPaymentData(initialLocalPaymentData)
        }
    },[debouncedValue] // Only call effect if debounced search term changes
  );


  React.useEffect(() => {
    if (isFocused) {
      onGetSupplierPaymentList();
    }
  }, [isFocused]);

  useEffect(() => {
      let paymentList = parsePaymentData(selectedSupplierPaymentList.slice().sort((a, b) => (Number(b.created) - Number(a.created))))
      setLocalPaymentData(paymentList)
      setInitialLocalPaymentData(paymentList);
  }, [selectedSupplierPaymentList]);

  return (
    <>
      <CustomStatusBar />
      <View style={{backgroundColor: 'white'}}>
        <SupplierSearchOrder
          text={searchText}
          setValue={setSearchText}
          placeholder={i18n.t('search')}
          isNotExpanded={!isSearchExpanded}
          onPress={onSearchPress}
        />
      </View>
      {selectedSupplierPaymentList?.length == 0 ? (
        <Text
          style={{
            padding: 20,
            fontSize: Fonts.regular,
            color: Colors.black,
            flex:1,
            backgroundColor: Colors.defaultBackground
          }}>
          {I18n.t('no_payments_found')}
        </Text>
        ) : (
      <SectionList
        style={{backgroundColor: Colors.defaultBackground}}
        sections={localPaymentData}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item}) => <PaymentListItem data={item} />}
        renderSectionHeader={({section: {title}}) => (
          <View
            style={{padding: 12, backgroundColor: Colors.defaultBackground}}>
            <Text style={{color: '#73788B'}}>{title}</Text>
          </View>
        )}
      />
      )}
      <BottomTabNavigator routeName={SupplierPathList.PAYMENT_LIST} />
      <LoadingSpinner visible={isLoading} textContent={''} />
    </>
  );
};

export default PaymentListScreen;

function useDebounce(value: string, delay: number | undefined) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}