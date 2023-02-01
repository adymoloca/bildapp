import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts } from '../../themes';
import { ITransaction } from '../../utils/interfaces';
import i18n from '../../services/i18n';

export default function PaymentListItem({ data }: { data: ITransaction }) {

  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const timeString = formatAMPM(data.transactionDate);
    setTimeString(timeString);
  }, []);

  const stornoSign = data.storno ? '-' : '+';
  const formatAMPM = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesString = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutesString + ' ' + ampm;
    return strTime;
  };
  const matches = (data?.name.match(/\b(\w)/g) || ['']).slice(0, 2);
  const acronym = matches.join('');
  return (
    <View style={{ backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.lightGrey }}>
      <View style={{ flexDirection: 'row', padding: 12 }}>
        <View style={{ width: 44, height: 44, borderRadius: 40, backgroundColor: Colors.lightGrey, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', color: 'black' }}>{`${acronym}`}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10 }}>
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontWeight: '400', fontSize: Fonts.regular, color: 'black' }}>{`${data.name}`}</Text>
            <Text style={{ color: Colors.nearlyBlack }}>{timeString}</Text>
          </View>
          <View style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <Text style={{ color: 'black', fontWeight: '300', textTransform: 'uppercase', fontSize: Fonts.regular }}>{`${stornoSign}${data.ammount} ${data.currency}`}</Text>
            <Text style={{ color: 'black', fontWeight: '300' }}>{`${i18n.t('fee')}: ${data.fee} ${data.currency.toLocaleUpperCase()}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
