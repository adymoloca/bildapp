import React, { useState } from 'react';
import { SectionList, Text, View } from 'react-native';
import CustomStatusBar from '../../components/CustomStatusBar';
import PaymentListItem from '../../components/PaymentListItem';
import SupplierSearchOrder from '../../components/SupplierSearchOrder';
import { Colors } from '../../themes';
import { paymentList } from '../../utils/mockData';

const AccountScreen = () => {

  const [searchText, setSearchText] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const onSearchPress = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  return (
    <>
      <CustomStatusBar />
      {/* <View>{!isSearchExpanded && <Text>Payments</Text>}</View> */}
      <View style={{ backgroundColor: 'white' }}>
        <SupplierSearchOrder
          text={searchText}
          setValue={setSearchText}
          placeholder={'Search'}
          isNotExpanded={!isSearchExpanded}
          onPress={onSearchPress}
        />
      </View>
      <SectionList
        style={{ backgroundColor: Colors.defaultBackground }}
        sections={paymentList}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => <PaymentListItem data={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ padding: 12, backgroundColor: Colors.defaultBackground }}>
            <Text style={{ color: '#73788B' }}>{title}</Text>
          </View>
        )}
      />
    </>
  );
};

export default AccountScreen;
