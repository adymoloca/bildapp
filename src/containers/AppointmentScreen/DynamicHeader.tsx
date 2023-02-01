import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
//@ts-ignore
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import CustomIcon from '../../atoms/CustomIcon';
import {Colors, Fonts} from '../../themes';
import images from '../../themes/Images';

const HEADER_HEIGHT = 90;

const renderNavBar = (
  color: string,
  isHided: boolean,
  title: string,
  onPress: () => void,
) => {
  const border = isHided ? styles.border : {};
  return (
    <View style={[styles.navContainer, border]}>
      <CustomIcon
        size={Fonts.h2}
        color={color}
        style={styles.icon}
        name="close"
        iconPack="custom"
        onPress={onPress}
      />
      {isHided && <Text style={styles.titleSmall}>{title}</Text>}
    </View>
  );
};

const titleComponent = (title: string) => {
  return (
    <View style={styles.body}>
      <Text style={styles.titleBig}>{title}</Text>
    </View>
  );
};

const DynamicHeader = ({
  children,
  title,
  image,
  onPress,
}: {
  children: any;
  title: string;
  image: any;
  onPress: () => void;
}) => {
  const [isHided, setIsHided] = React.useState<boolean>(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setBarStyle(isHided || !isFocused ? 'dark-content' : 'light-content', true);
  }, [isFocused, isHided]);

  return (
    <>
      <ReactNativeParallaxHeader
        headerMinHeight={HEADER_HEIGHT}
        headerMaxHeight={200}
        extraScrollHeight={20}
        navbarColor={'white'}
        titleStyle={styles.titleBig}
        title={titleComponent(title)}
        backgroundImage={image}
        backgroundImageScale={1}
        renderNavBar={() =>
          renderNavBar(
            isHided ? Colors.black : Colors.white,
            isHided,
            title,
            onPress,
          )
        }
        renderContent={() => children}
        containerStyle={styles.container}
        contentContainerStyle={styles.contentContainer}
        innerContainerStyle={styles.container}
        scrollViewProps={{
          onScroll: (event: any) => {
            if (event.nativeEvent.contentOffset.y > HEADER_HEIGHT) {
              setIsHided(true);
            } else {
              setIsHided(false);
            }
          },
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  navContainer: {
    paddingTop: 30,
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkGreyIrina,
  },
  titleBig: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: Fonts.h3,
  },
  titleSmall: {
    color: Colors.black,
    fontSize: Fonts.bigger,
    alignSelf: 'center',
  },
  body: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: 15,
    paddingBottom: 40,
  },
  icon: {
    position: 'absolute',
    top: 45,
    left: 15,
  },
});

export default DynamicHeader;
