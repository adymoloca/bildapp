import React from 'react';
import {View} from 'react-native';
import {Skeleton} from '../index';

interface IProps { 
  numberOfItems?: number 
}

export const DetailsSkeleton: React.FC<IProps> = ({numberOfItems}) => {
  return (
    <>
      {[...Array(numberOfItems).keys()].map((index) => (
        <View key={index} style={{marginBottom: 30, paddingHorizontal:10}}>
          <Skeleton height={60} width={'100%'} borderRadius={5} backgroundColor={'lightgray'}>
            <View style={{marginHorizontal: 5}}>
              <View style={{marginTop: 5, marginBottom: 10}}>
                <Skeleton height={10} width={'45%'} borderRadius={5} backgroundColor={'gray'} /> 
              </View>
              <Skeleton height={15} width={'35%'} borderRadius={5} backgroundColor={'gray'} />
              <View style={{marginTop:10}}>
              <Skeleton height={2} width={'100%'} borderRadius={5} backgroundColor={'gray'} />
              </View>
             
            </View>
          </Skeleton>
        </View>
      ))}
    </>
  );
}
