import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomIcon from '../../atoms/CustomIcon';
import CustomTextInput from '../../components/CustomTextInput';
import HeaderBar from '../../components/HeaderBar';
import {
  actions,
  selectError,
  selectIsError,
  selectIsLoading,
  selectSupplierCompanyDetails,
} from '../../redux/slices/persistedUserSlice';
import i18n from '../../services/i18n';
import {Colors, Fonts} from '../../themes';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import OrderScreenLtrStyle from '../../themes/styles/orderScreen.ltr.style';
import {
  Address,
  ISupplierCompany,
  SupplierCompany,
} from '../../utils/interfaces';
import CustomStatusBar from '../../components/CustomStatusBar';
import {CurrencyPicker} from './CurrencyPicker';
import {
  validateBankAccount,
  validateCif,
  validateName,
} from '../../utils/utils';
import {SupplierPathList} from '../../utils/enums';
import SuccessModal from '../../modals/SuccessModal.tsx';
import {IRootState} from '../../redux/store';
import {Button} from 'react-native-elements';
import { DetailsSkeleton } from '../../components/Skeleton/Details/index';

const InvoiceDetailsScreen = () => {
  const [companyName, setCompanyName] = useState('');
  const [cif, setCif] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [currency, setCurrency] = useState('');
  const isError = useSelector(selectIsError);
  const error = useSelector(selectError);
  const [addressObject, setAddressObject] = useState(new Address());

  const [companyNameError, setCompanyNameError] = useState('');
  const [cifError, setCifError] = useState('');
  const [companyAddressError, setCompanyAddressError] = useState('');
  const [bankAccountError, setBankAccountError] = useState('');
  const isLoading = useSelector(selectIsLoading);
  const [isFieldFocused, setIsFieldFocused] = useState(false);
  const isModalVisible = useSelector(
    (state: IRootState) => state.order.infoModalData,
  );

  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const supplierCompanyDetails = useSelector(selectSupplierCompanyDetails);
  const onSetClientCompanyDetails = (companyDetails: ISupplierCompany) =>
    dispatch(actions.updateSupplierCompanyDetailsAttempt(companyDetails));

  useEffect(() => {
    dispatch(actions.getSupplierCompanyDetailsAttempt());
  }, []);

  useEffect(() => {
    if (supplierCompanyDetails) {
      setCompanyName(supplierCompanyDetails.companyName || '');
      setCif(supplierCompanyDetails.cif || '');
      setCompanyAddress(
        supplierCompanyDetails?.companyAddress?.formattedAddress || '',
      );
      setAddressObject(supplierCompanyDetails?.companyAddress || new Address());
      setBankAccount(supplierCompanyDetails.bankAccount || '');
      setCurrency(supplierCompanyDetails.currency || '');
    }
  }, [supplierCompanyDetails]);

  useEffect(() => {
    if (isError) {
      if (
        error.code === 'bank_account_unusable' ||
        error.code === 'account_number_invalid'
      ) {
        setBankAccountError(i18n.t('bank_account_error'));
      }
    }
  }, [isError]);

  const onValidateName = (value: string): string => {
    let error = '';
    if (!validateName(value)) {
      error = i18n.t('name_error');
    }
    setCompanyNameError(error);
    return error;
  };
  const onValidateBankAccount = (value: string): string => {
    let error = '';
    if (!validateBankAccount(value)) {
      error = i18n.t('bank_account_error');
    }
    setBankAccountError(error);
    return error;
  };
  const onValidateCif = (value: string): string => {
    let error = '';
    if (!validateCif(value)) {
      error = i18n.t('cif_error');
    }
    setCifError(error);
    return error;
  };

  const onValidateAddress = (value: string): string => {
    let error = '';
    console.log(value);
    if (!value || value.length === 0) {
      error = i18n.t('address_error');
    }
    setCompanyAddressError(error);
    return error;
  };
  const validateFields = () => {
    const localCompanyNameError = onValidateName(companyName);
    const localCompanyAddressError = onValidateAddress(companyAddress);
    const localCifError = onValidateCif(cif);
    const localBankAccountError = onValidateBankAccount(bankAccount);

    if (
      !localCompanyNameError &&
      !localCompanyAddressError &&
      !localCifError &&
      !localBankAccountError
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onSaveDetails = () => {
    if (validateFields()) {
      onSetClientCompanyDetails({
        companyName: companyName,
        companyAddress: addressObject,
        bankAccount: bankAccount,
        currency: currency,
        cif: cif,
      });
    }
    setIsFieldFocused(false);
    Keyboard.dismiss();
  };

  // const onCancel = () => {
  //   if (supplierCompanyDetails) {
  //     setCompanyName(supplierCompanyDetails.companyName || '');
  //     setCif(supplierCompanyDetails.cif || '');
  //     setCompanyAddress(
  //       supplierCompanyDetails?.companyAddress?.formattedAddress || '',
  //     );
  //     setAddressObject(supplierCompanyDetails?.companyAddress || new Address());
  //     setBankAccount(supplierCompanyDetails.bankAccount || '');
  //     setCurrency(supplierCompanyDetails.currency || '');
  //   }
  //   setIsFieldFocused(false);
  //   Keyboard.dismiss();
  // };

  const disabledNextStep =
    !companyName ||
    !bankAccount ||
    !cif ||
    !companyAddress ||
    !!(companyNameError || bankAccountError || cifError);

  const ref0 = React.createRef<TextInput>();
  const ref1 = React.createRef<TextInput>();
  const ref2 = React.createRef<TextInput>();

  const header = (
    <HeaderBar
      placement="center"
      leftComponent={
        <CustomIcon
          size={Fonts.h5}
          color={Colors.black}
          iconPack="custom"
          name="arrow-back"
          onPress={navigation.goBack}
        />
      }
      centerComponent={
        <Text style={OrderScreenLtrStyle.title_text}>
          {i18n.t('billing_details')}
        </Text>
      }
      rightComponent={null}
      noBorder={true}
    />
  );
  const content = (
    <ScrollView
      style={{
        flex: 1,
      }}>
      {isLoading  ? ( 
        <View style={{marginTop: 30}}>
          <DetailsSkeleton numberOfItems={5}/>
        </View>
      ) : (
      <View style={{padding: 15}}>
        <CustomTextInput
          label={i18n.t('company_name')}
          isLabelAbove
          value={companyName}
          ref={ref0}
          onChange={setCompanyName}
          onSubmitEditing={() => ref1?.current?.focus()}
          extraStyle={GlobalLtrStyle.regularBlackText}
          error={companyNameError}
          onEndEditing={onValidateName}
          onFocus={() => {
            setIsFieldFocused(true);
          }}
        />
        <CustomTextInput
          label={'CIF'}
          isLabelAbove
          value={cif}
          ref={ref1}
          onChange={setCif}
          onSubmitEditing={() => ref2?.current?.focus()}
          extraStyle={GlobalLtrStyle.regularBlackText}
          error={cifError}
          onEndEditing={onValidateCif}
          onFocus={() => {
            setIsFieldFocused(true);
          }}
        />
        <CustomTextInput
          isLabelAbove
          label={i18n.t('company_address')}
          value={companyAddress}
          ref={ref2}
          onChange={setCompanyAddress}
          onFocus={() => {
            dispatch(
              actions.setSupplierCompanyDetails({
                ...(supplierCompanyDetails || new SupplierCompany()),
                companyName: companyName,
                companyAddress: addressObject,
                bankAccount: bankAccount,
                currency: currency,
                cif: cif,
              }),
            );
            navigation.navigate(SupplierPathList.SEARCH_ADDRESS);
            ref2?.current?.blur();
          }}
          error={companyAddressError}
        />
        <CurrencyPicker
          isLabelAbove
          label={i18n.t('currency')}
          value={currency}
          onChange={setCurrency}
        />
        <CustomTextInput
          isLabelAbove
          label={i18n.t('bank_account')}
          value={bankAccount}
          onChange={setBankAccount}
          error={bankAccountError}
          onEndEditing={onValidateBankAccount}
          onFocus={() => {
            setIsFieldFocused(true);
          }}
        />
      </View>)}
    </ScrollView>
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <CustomStatusBar />
        {header}
        {content}
      </KeyboardAvoidingView>
      <Button
        title={i18n.t('save')}
        disabled={disabledNextStep}
        onPress={onSaveDetails}
        buttonStyle={[
          GlobalLtrStyle.bottomConfirmationButton,
          {marginHorizontal: 10},
        ]}
      />
      {!isLoading && <SuccessModal />}
      <SafeAreaView />
    </>
  );
};

export default InvoiceDetailsScreen;
