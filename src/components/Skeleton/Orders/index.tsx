import React from 'react';
import {View} from 'react-native';
import {Skeleton} from '../../Skeleton/index';

interface IProps { 
  numberOfItems?: number 
}

export const OrdersSkeleton: React.FC<IProps> = ({numberOfItems}) => {
  return (
    <>
      {[...Array(numberOfItems).keys()].map((index) => 
        <View key={index} style={{marginTop:15,marginBottom:15, marginHorizontal: 10}}> 
          <Skeleton height={100} width={'100%'} borderRadius={10} backgroundColor={'lightgray'}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal:15}}>
              <View style={{marginTop:9}}>
                <View style={{marginBottom:5}}>
                  <Skeleton height={20} width={200} borderRadius={10} backgroundColor={'gray'} />
                </View>
                <Skeleton height={15} width={180} borderRadius={10} backgroundColor={'gray'} />
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop:15}}>
                  <Skeleton height={30} width={30} borderRadius={30} backgroundColor={'gray'} />
                  <View style={{marginLeft:2}}>
                    <Skeleton height={20} width={30} borderRadius={10} backgroundColor={'gray'} />
                  </View>
                </View>
              </View>
              <View style={{marginTop:10}}>
                <Skeleton height={20} width={20} borderRadius={20} backgroundColor={'gray'} />
              </View>
            </View>
          </Skeleton>
        </View>
      )}
    </>
  );
};
