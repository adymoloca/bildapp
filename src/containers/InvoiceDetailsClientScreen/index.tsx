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
  selectClientCompanyDetails,
  selectIsLoading,
} from '../../redux/slices/persistedUserSlice';
import i18n from '../../services/i18n';
import {Colors, Fonts} from '../../themes';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import OrderScreenLtrStyle from '../../themes/styles/orderScreen.ltr.style';
import {IClientCompany} from '../../utils/interfaces';
import CustomStatusBar from '../../components/CustomStatusBar';
import {validateCif, validateName, validateNoRegCom} from '../../utils/utils';
import { DetailsSkeleton } from '../../components/Skeleton/Details/index';

const InvoiceDetailsClientScreen = () => {
  const [companyName, setCompanyName] = useState('');
  const [noRegCom, setNoRegCom] = useState('');
  const [cif, setCif] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');

  const [companyNameError, setCompanyNameError] = useState('');
  const [noRegComError, setNoRegComError] = useState('');
  const [cifError, setCifError] = useState('');
  const [companyAddressError, setCompanyAddressError] = useState('');
  const isLoading = useSelector(selectIsLoading);
  // const [fakeLoading, setFakeLoading] = useState(true); 
  const [isFieldFocused, setIsFieldFocused] = useState(false);

  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const clientCompanyDetails = useSelector(selectClientCompanyDetails);
  const onSetClientCompanyDetails = (companyDetails: IClientCompany) =>
    dispatch(actions.updateClientCompanyDetailsAttempt(companyDetails));

  useEffect(() => {
    dispatch(actions.getClientCompanyDetailsAttempt());
  }, []);

  // useEffect(() => {
  //   setTimeout(()=>setFakeLoading(false), 1000);
  //   return ()=>setFakeLoading(true);
  // }, [navigation]);

  useEffect(() => {
    if (clientCompanyDetails) {
      setCompanyName(clientCompanyDetails.companyName || '');
      setNoRegCom(clientCompanyDetails.registrationNumber || '');
      setCif(clientCompanyDetails.cif || '');
      setCompanyAddress(clientCompanyDetails?.companyAddress || '');
    }
  }, [clientCompanyDetails]);

  const areAllFieldsEmpty =
    !companyName && !noRegCom && !cif && !companyAddress;

  const onValidateName = (value: string): string => {
    let error = '';
    if (!validateName(value)) {
      error = i18n.t('name_error');
    }
    setCompanyNameError(error);
    return error;
  };
  const onValidateNoRegCom = (value: string): string => {
    let error = '';
    console.log(value);
    if (!validateNoRegCom(value)) {
      error = i18n.t('no_reg_com_error');
    }
    setNoRegComError(error);
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
    const localNoRegComError = onValidateNoRegCom(noRegCom);

    if (
      !localCompanyNameError &&
      !localCompanyAddressError &&
      !localCifError &&
      !localNoRegComError
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
        registrationNumber: noRegCom,
        cif: cif,
        companyAddress: companyAddress,
      });
    }
    setIsFieldFocused(false);
    Keyboard.dismiss();
  };

  const onCancel = () => {
    if (clientCompanyDetails) {
      setCompanyName(clientCompanyDetails.companyName || '');
      setNoRegCom(clientCompanyDetails.registrationNumber || '');
      setCif(clientCompanyDetails.cif || '');
      setCompanyAddress(clientCompanyDetails?.companyAddress || '');
    }
    setIsFieldFocused(false);
    Keyboard.dismiss();
  };

  const disabledNextStep =
    !companyName ||
    !noRegCom ||
    !cif ||
    !companyAddress ||
    companyNameError ||
    noRegComError ||
    cifError ||
    companyAddressError;
  // used for switching between text fields

  const ref0 = React.createRef<TextInput>();
  const ref1 = React.createRef<TextInput>();
  const ref2 = React.createRef<TextInput>();
  const ref3 = React.createRef<TextInput>();

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
    
    <View
      style={{
        flex: 1,
      }}>
      {isLoading ? ( 
        <View style={{marginTop: 30}}>
          <DetailsSkeleton numberOfItems={4}/>
        </View>
      ) : (
      <View>
        <View style={{padding: 15}}>
          <CustomTextInput
            label={i18n.t('company_name')}
            isLabelAbove
            value={companyName}
            ref={ref0}
            onChange={setCompanyName}
            onSubmitEditing={() => ref1.current?.focus()}
            extraStyle={GlobalLtrStyle.regularBlackText}
            error={companyNameError}
            onEndEditing={onValidateName}
            onFocus={() => {
              setIsFieldFocused(true);
            }}
          />
          <CustomTextInput
            label={i18n.t('no_reg_com')}
            isLabelAbove
            value={noRegCom}
            ref={ref1}
            onChange={setNoRegCom}
            onSubmitEditing={() => ref2.current?.focus()}
            extraStyle={GlobalLtrStyle.regularBlackText}
            error={noRegComError}
            onEndEditing={onValidateNoRegCom}
            onFocus={() => {
              setIsFieldFocused(true);
            }}
          />
          <CustomTextInput
            isLabelAbove
            label="CIF"
            value={cif}
            ref={ref2}
            onChange={setCif}
            onSubmitEditing={() => ref3.current?.focus()}
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
            ref={ref3}
            onChange={setCompanyAddress}
            onFocus={() => {
              setIsFieldFocused(true);
            }}
            onEndEditing={onValidateAddress}
          />
        </View>
      </View>
      )}
    </View>
  );
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <CustomStatusBar />
      {header}
      {content}
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: 50,
            backgroundColor: 'white',
            borderTopWidth: 2,
            borderTopColor: 'rgba(0,0,0,0.1)',
          },
        ]}>
        <TouchableOpacity style={{marginLeft: 30}} onPress={onCancel}>
          <Text
            style={{
              fontSize: Fonts.input,
              color: Colors.green,
              fontWeight: 'bold',
            }}>
            {i18n.t('cancel')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={Boolean(disabledNextStep)}
          style={{marginRight: 30}}
          onPress={onSaveDetails}>
          <Text
            style={{
              fontSize: Fonts.input,
              color: disabledNextStep ? Colors.darkGrey : Colors.green,
              fontWeight: 'bold',
            }}>
            {i18n.t('save')}
          </Text>
        </TouchableOpacity>
      </View>

      <SafeAreaView />
    </KeyboardAvoidingView>
  );
};

export default InvoiceDetailsClientScreen;
