import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import CustomIcon from '../../atoms/CustomIcon';
import CustomTextInput from '../../components/CustomTextInput';
import HeaderBar from '../../components/HeaderBar';
import {
  actions,
  selectError,
  selectIsError,
  selectIsLoading,
  selectRepresenative,
} from '../../redux/slices/persistedUserSlice';
import i18n from '../../services/i18n';
import {Colors, Fonts} from '../../themes';
import GlobalLtrStyle from '../../themes/styles/global.ltr.style';
import OrderScreenLtrStyle from '../../themes/styles/orderScreen.ltr.style';
import {IRepresentative} from '../../utils/interfaces';
import CustomImagePicker from '../../components/CustomImagePicker';
import BirthdayPicker from '../../components/BirthdayPicker';
import CustomStatusBar from '../../components/CustomStatusBar';
import {validateName} from '../../utils/utils';
import SuccessModal from '../../modals/SuccessModal.tsx';
import { DetailsSkeleton } from '../../components/Skeleton/Details';

const RepresentativeDetailsScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [idFrontDisabled, setIdFrontDisabled] = useState(false);

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const isError = useSelector(selectIsError);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isFieldFocused, setIsFieldFocused] = useState(false);

  const representative = useSelector(selectRepresenative);
  const onSetRepresentative = (newRepresentative: IRepresentative) =>
    dispatch(actions.updateRepresentativeAttempt(newRepresentative));
  const [idFront, setIdFront] = useState({});

  const getStringDate = (newDate: Date) => {
    return (
      newDate.getDate() +
      '/' +
      (newDate.getMonth() + 1) +
      '/' +
      newDate.getFullYear()
    );
  };

  const getMinDate = (newDate: Date) => {
    return new Date(
      newDate.getFullYear() - 18,
      newDate.getMonth(),
      newDate.getDate(),
    );
  };

  useEffect(() => {
    dispatch(actions.getRepresentativeAttempt());
  }, []);

  useEffect(() => {
    if (representative) {
      setFirstName(representative.firstName || '');
      setLastName(representative?.lastName || '');
      setBirthday(
        representative?.birthday
          ? new Date(representative?.birthday)
          : getMinDate(new Date()),
      );
      if (representative.idFront?.fileName != null) {
        setIdFront(representative.idFront);
        setIdFrontDisabled(true);
      } else if (!representative.idFront) {
        setIdFront({});
        setIdFrontDisabled(false);
      }
    }
  }, [representative]);

  const areAllFieldsEmpty = !firstName && !lastName && !birthday && !idFront;

  useEffect(() => {
    if (isError) {
      Alert.alert('Stripe error', error?.messages?.join(' '), [
        {text: 'OK', onPress: () => dispatch(actions.clearError())},
      ]);
    }
  }, [isError]);

  const onValidateFirstName = (value: string): string => {
    let error = '';
    if (!validateName(value)) {
      error = i18n.t('name_error');
    }
    setFirstNameError(error);
    return error;
  };
  const onValidateLasttName = (value: string): string => {
    let error = '';
    if (!validateName(value)) {
      error = i18n.t('name_error');
    }
    setLastNameError(error);
    return error;
  };
  const validateFields = () => {
    const localFirstNameError = onValidateFirstName(firstName);
    const localLastNameError = onValidateLasttName(lastName);

    if (!localFirstNameError && !localLastNameError) {
      return true;
    } else {
      return false;
    }
  };

  const onSaveDetails = () => {
    if (areAllFieldsEmpty) {
      onSetRepresentative({});
    } else if (validateFields()) {
      onSetRepresentative({
        firstName: firstName,
        lastName: lastName,
        birthday: getStringDate(birthday),
        idFront: idFront,
      });
    }
    setIsFieldFocused(false);
    Keyboard.dismiss();
  };

  const onCancel = () => {
    if (representative) {
      setFirstName(representative.firstName || '');
      setLastName(representative?.lastName || '');
      setBirthday(
        representative?.birthday
          ? new Date(representative?.birthday)
          : getMinDate(new Date()),
      );
      if (representative.idFront?.fileName != null) {
        setIdFront(representative.idFront);
        setIdFrontDisabled(true);
      } else if (!representative.idFront) {
        setIdFront({});
        setIdFrontDisabled(false);
      }
    }
    setIsFieldFocused(false);
    Keyboard.dismiss();
  };

  const disabledNextStep =
    !firstName || !lastName || !birthday || !!(firstNameError || lastNameError);

  // used for switching between text fields
  const refs: any[] = [];
  for (let i = 0; i < 4; i++) {
    refs[i] = useRef();
  }

  const content = (
    <ScrollView
      style={{
        flex: 1,
      }}>
      {isLoading  ? ( 
        <View style={{marginTop: 30}}>
          <DetailsSkeleton numberOfItems={4}/>
        </View>
      ) : (
      <View style={{padding: 15}}>
        <CustomTextInput
          label={i18n.t('first_name')}
          isLabelAbove
          value={firstName}
          ref={refs[0]}
          onChange={setFirstName}
          onSubmitEditing={() => refs[1].current?.focus()}
          extraStyle={GlobalLtrStyle.regularBlackText}
          error={firstNameError}
          onEndEditing={onValidateFirstName}
        />
        <CustomTextInput
          label={i18n.t('last_name')}
          isLabelAbove
          value={lastName}
          ref={refs[1]}
          onChange={setLastName}
          onSubmitEditing={() => refs[2].current?.focus()}
          extraStyle={GlobalLtrStyle.regularBlackText}
          error={lastNameError}
          onEndEditing={onValidateLasttName}
        />
        <BirthdayPicker
          label={i18n.t('birthday')}
          value={birthday}
          ref={refs[2]}
          stringValue={getStringDate(birthday)}
          setValue={setBirthday}
        />
        <View style={{marginBottom: 15}}></View>
        <CustomImagePicker
          label={i18n.t('id_front')}
          ref={refs[3]}
          value={idFront}
          setValue={setIdFront}
          disabled={idFrontDisabled}
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
              {i18n.t('representative_details')}
            </Text>
          }
          rightComponent={null}
          noBorder={true}
        />
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

export default RepresentativeDetailsScreen;
