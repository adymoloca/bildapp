import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

interface IProps { 
  width: number | string
  height: number
  borderRadius?: number
  backgroundColor: string
}
//these are the props we used for the skeleton component, we can add more if needed for future pages
export const Skeleton: React.FC<IProps> = ({
  width,
  height,
  borderRadius,
  backgroundColor,
  children
}) => {
  const opacity = useRef(new Animated.Value(0.3));

  useEffect(() => { 
    Animated.loop( //here we create a loop for the animation
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 300,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 800,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={{
        opacity: opacity.current,
        height: height,
        width: width,
        borderRadius: borderRadius,
        backgroundColor: backgroundColor,
      }}
    >{children}</Animated.View>//with this we can add children in the skeleton so we can create the full detail skeleton as asked
  );
};
