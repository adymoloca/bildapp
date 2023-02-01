import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default ({
  backgroundColor = 'white',
  barStyle = 'dark-content',
  ...props
}: any) => {
  const isFocused = useIsFocused();
  return isFocused ? (
    <View style={[styles.statusBar, {backgroundColor}]}>
      <SafeAreaView>
        <StatusBar
          translucent
          barStyle={barStyle}
          backgroundColor={backgroundColor}
          {...props}
        />
      </SafeAreaView>
    </View>
  ) : null;
};

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#79B45D',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});
