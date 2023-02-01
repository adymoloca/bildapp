import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import CustomIcon from '../../atoms/CustomIcon';
import i18n from '../../services/i18n';
import { Colors, Fonts } from '../../themes';
import RequestListScreenLtrStyle from '../../themes/styles/RequestListScreen.ltr.style';

const SupplierSearchOrder = (
  { text, placeholder, isNotExpanded, onPress, setValue }: { placeholder?: string; isNotExpanded?: boolean; text: string; onPress?: () => void; setValue: (value: string) => void; }
): JSX.Element => {

  const searchInput = React.useRef<TextInput>(null);

  // React.useEffect(() => {
  //   !isNotExpanded ? searchInput.current?.focus() : searchInput.current?.blur();
  // }, [isNotExpanded]);

  const onCancel = () => {
    setValue('');
    onPress && onPress();
  };

  return (
    <View style={RequestListScreenLtrStyle.search_container}>
      {isNotExpanded ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
          <View style={{ width: 30 }} />
          <Text style={{ fontSize: Fonts.regular, color: 'black', fontWeight: '500' }}>{i18n.t('payments')}</Text>
          <TouchableOpacity onPress={onPress}>
            <CustomIcon
              onPress={onPress}
              // style={{}}
              name="search"
              size={Fonts.h5}
              color={Colors.black}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={RequestListScreenLtrStyle.search_textinput_view}>
            <View style={RequestListScreenLtrStyle.search_icon_container}>
              <CustomIcon
                name="search"
                size={Fonts.h5}
                color={Colors.greyIrina}
              />
            </View>
            <TextInput
              value={text}
              ref={searchInput}
              onChangeText={setValue}
              style={RequestListScreenLtrStyle.search_textinput}
              placeholder={placeholder ? placeholder : ''}
            />
          </View>
          <View style={RequestListScreenLtrStyle.search_icon_view}>
            <TouchableOpacity
              onPress={onCancel}>
              <Text
                style={{
                  fontSize: Fonts.regular,
                  color: Colors.black,
                  marginRight: 5,
                }}>
                {i18n.t('cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default SupplierSearchOrder;
