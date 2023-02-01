import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import i18n from '../../services/i18n';
import { Colors } from '../../themes';
import SupplierOpenOrdersScreenLtrStyle from '../../themes/styles/supplierOpenOrdersScreen.ltr.style';
import { FilterItem } from '../../utils/orderUtil';

const FilterButtons = ({ items, setSelectedItem, selectedItem }: { items: FilterItem[]; setSelectedItem: (value: FilterItem) => void; selectedItem: string }) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={SupplierOpenOrdersScreenLtrStyle.sort_filter}>
        {items.map((item: any, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedItem(item)}
            style={{ justifyContent: 'center', paddingRight: 25 }}>
            <View
              style={{
                borderColor:
                  selectedItem === item ? Colors.green : Colors.white,
                borderBottomWidth: 2,
              }}>
              <Text
                style={
                  selectedItem === item
                    ? SupplierOpenOrdersScreenLtrStyle.filterOptionChecked
                    : SupplierOpenOrdersScreenLtrStyle.filterOption
                }>
                {i18n.t(item)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default FilterButtons;
